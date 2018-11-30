
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { AbilityBuilder, Ability } = require('@casl/ability')
const {
  //rulesToQuery,
  //rulesToFields,
  //permittedFieldsOf,
   unpackRules
} = require('@casl/ability/extra');

const { toMongoQuery } = require('@casl/mongoose')
const { Forbidden } = require('@feathersjs/errors');
const TYPE_KEY = Symbol.for('type')
const { ExtractJwt } = require('@feathersjs/authentication-jwt');
const { checkContext, getItems, replaceItems } = require('feathers-hooks-common');
const getByPath = require('lodash.get')
 
Ability.addAlias('update', 'patch')
Ability.addAlias('read', ['get', 'find'])
Ability.addAlias('delete', 'remove')

/**
 * @name parseJSON
 * @description
 *   -This method pass the template and interpolates
 * @function
 * @memberof module:Hook.Authorize
 * @param {string} template  - permission template
 * @param {string} variables - for interpolates
 * @return {object} - permission object
 * @author Gowthaman Murugan
 */
const parseJSON = (template, variables) => {
  return JSON.parse(template, (key, rawValue) => {
    if (!rawValue) {
      return;
    }
    if (rawValue[0] !== '$') {
      return rawValue;
    }
     console.log("......rawValue",rawValue);
    const name = rawValue.slice(2, -1);
    console.log("......name",name);
    console.log("............ddd..",variables);

    const value = getByPath(variables, name);

    if (typeof value === 'undefined') {
      throw new ReferenceError(`Variable ${name} is not defined`);
    }

    return value;
  });
};
/**
 * @name subjectName
 * @description
 *   -To get subject name(service Name)
 * @function
 * @memberof module:Hook.Authorize
 * @param {*} subject  - get subject name
 * @author Gowthaman Murugan
 */
function subjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject
  }

  return subject[TYPE_KEY]
}
/**
 * @name defineAbilitiesFor
 * @description
 *   - Current user object is passed into the function, so the permissions can be modified based on any user attributes.
 *   - UnpackRules and iterate permissions
 * @function
 * @memberof module:Hook.Authorize
 * @param {object} user  - loggedin user object
 * @param {array} permissions  - permission
 * @author Gowthaman Murugan
 * @see {@link https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html|about unpackRules}
 */

function defineAbilitiesFor(user,permissions) {
  const template = unpackRules(permissions);
  return new Ability(parseJSON(JSON.stringify(template),{user}),subjectName)
}

// function defineAbilitiesFor(user,permissions) {
//   const { rules, can } = AbilityBuilder.extract()
//   let rules = [];
//   permissions = unpackRules(permissions);
//   for (const permission of permissions) {
//     rules.push(permission);
//   }
//   return new Ability(
//     parseJSON(JSON.stringify(rules), {
//       user
//     }),
//     subjectName
//   );
//  }

 /**
 * @name canReadQuery
 * @description
 *   - its helper function to check query value null are not
 * @function
 * @memberof module:Hook.Authorize
 * @param {object} subject  - some object
 * @return {object} - json object
 */
function canReadQuery(query) {
  return query !== null
}

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {

  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, 'before', ['find', 'get', 'create', 'update', 'patch', 'remove']);
    
    const action = context.method;
    let serviceName = context.path;
    const service = context.app.service(serviceName);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params;

    //ExtractToken and get the permissions
    const token = ExtractJwt.fromHeader('authorization')(context.params);
    const extractToken = await context.app.passport.verifyJWT(
      token,
      context.app.get('authentication')
    );
    let ability = defineAbilitiesFor(
      user,
      extractToken.permissions
    );
    const throwUnlessCan = (action, resource, fields) => {
      console.log('permission checking', {
        action,
        resource,
        fields
      });
      try {
        if (fields) {
          ability.throwUnlessCan(action, resource, fields);
        } else {
          ability.throwUnlessCan(action, resource);
        }
        console.log('permission success', {
          action,
          resource,
          fields
        });
      } catch (error) {
        console.error('Permission denied', {
          error: error
        });
        let errMsg = `You are not allowed to ${error.action} ${serviceName}.`;
        if (error.message) {
          errMsg += `Because of ${error.message}`;
        }
        throw new Forbidden(errMsg);
      }
    };


    //set Ability to params
    context.params.ability = ability;

    //Check user have  Permission for method in service
    throwUnlessCan(context.method, serviceName);
    //for find Method
    if (!context.id) {
      const query = toMongoQuery(ability, serviceName, action);
      console.log('check have any conditions added ?');
      console.log('condition based  query', { query: query });
      if (canReadQuery(query) || context.params.query) {
        Object.assign(context.params.query, query);
      } else {
        // The only issue with this is that user will see total amount of records in db
        // for the resources which he shouldn't know.
        // Alternative solution is to assign `__nonExistingField` property to query
        // but then feathers-mongoose will send a query to MongoDB which for sure will return empty result
        // and may be quite slow for big datasets
        context.params.query.$limit = 0;
      }

      return context;
    }


    const params = Object.assign({}, context.params, { provider: null })
    const result = await service.get(context.id, params)

    result[TYPE_KEY] = serviceName
    throwUnlessCan(action, result)

    if (action === 'get') {
      context.result = result
    }


    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    /*
    Modify records and/or context.
     */

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw to reject the service call, or on an unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}

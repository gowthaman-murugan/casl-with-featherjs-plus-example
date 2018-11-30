// Configure authentication. (Can be re-generated.)
const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
// !code: imports 
const { packRules } = require('@casl/ability/extra')
// !end
// !code: init // !end

let moduleExports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  // !code: loc_1
  const getLoggedInUser = context => {
    return context.app.service('users').get(context.params.payload.userId);
  };
  const getUserPermissions = (roleIds, context) => {
    return context.app
      .service('permissions')
      .find({
        query: {
          roleId: roleIds,
          $select : ['actions','subject','inverted','fields','reason','conditions']
        }
      });
  };

  const addTenantIdToJwtPayload = async context => {
    // This hook adds the `tenant` attribute to the JWT payload by
    // modifying params.payload.

    // make sure params.payload exists
    context.params.payload = context.params.payload || {};
    const user = await getLoggedInUser(context);
    const permissionList = await getUserPermissions(user.roles, context);
    const permissions = packRules(permissionList.data || []);
    // merge in a `tenant` property
    Object.assign(context.params.payload, {
      organizationId: user.organizationId,
      permissions: permissions
    });
    return context;
  };
  // !end

  // !code: loc_2 // !end

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        // !<DEFAULT> code: before_create
        authentication.hooks.authenticate(config.strategies),
        addTenantIdToJwtPayload
        // !end
      ],
      remove: [
        // !<DEFAULT> code: before_remove
        authentication.hooks.authenticate('jwt'),
        // !end
      ],
      // !code: before // !end
    },
    // !code: after // !end
  });
  // !code: func_return

  const service = app.service('authentication');
  service.docs = {
    description: 'Service to authentication',
    definitions: {
      'authentication': {
        $ref: '#/definitions/authentication'
      },
      authentication: {
        "type": "object",
        "required": [
          "strategy",
          "email",
          "password"
        ],
        "properties": {
          "strategy": {
            "type": "string",
            "default": "local",
          },
          "email": {
            "type": "string",
          },
          "password": {
            "type": "string",
          }
        }
      }
    }
  }

  app.use('/authentication', service);

  // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

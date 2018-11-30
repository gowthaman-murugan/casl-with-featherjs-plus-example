/**
 * @namespace Roles
 * @memberof module:APP.Service
 */
// Initializes the `roles` service on path `/roles`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../models/roles.model');
const hooks = require('./roles.hooks');
// !code: imports
const {schema} = require('./roles.schema');
// !end
// !code: init // !end

let moduleExports = function (app) {
  let Model = createModel(app);
  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    Model,
    paginate,
    // !code: options_more // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  const roles = createService(options);
  roles.docs = {
    description: 'Service to manage roles',
    definitions: {
      'roles': {
        $ref: '#/definitions/roles'
      },
      roles: schema
    }
  };
  
  app.use('/roles', roles);

  // Get our initialized service so that we can register hooks
  const service = app.service('roles');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

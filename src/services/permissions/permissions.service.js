/**
 * @namespace Permissions
 * @memberof module:APP.Service
 */

// Initializes the `permissions` service on path `/permissions`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../models/permissions.model');
const hooks = require('./permissions.hooks');
// !code: imports
const { schema } = require('./permissions.schema');

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
  
  const permissions = createService(options);
  permissions.docs = {
    description: 'Service to manage permissions',
    definitions: {
      'permissions': {
        $ref: '#/definitions/permissions'
      },
      permissions: schema
    }
  };
  // Initialize our service with any options it requires
  app.use('/permissions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('permissions');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

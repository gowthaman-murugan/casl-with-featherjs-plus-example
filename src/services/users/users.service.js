/**
 * @namespace Users
 * @memberof module:APP.Service
 */
// Initializes the `users` service on path `/users`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
// !code: imports 
const { schema } = require('./users.schema');
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

  const users = createService(options);
  users.docs = {
    description: 'Service to manage users',
    definitions: {
      'users': {
        $ref: '#/definitions/users'
      },
      users: schema
    }
  };
  
  app.use('/users', users);

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

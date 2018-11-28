
// Initializes the `organizations` service on path `/organizations`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../models/organizations.model');
const hooks = require('./organizations.hooks');
// !code: imports 
const {schema } = require('./organizations.schema');
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

  const organizations = createService(options);
  organizations.docs = {
    description: 'Service to manage organizations',
    definitions: {
      'organizations': {
        $ref: '#/definitions/organizations'
      },
      organizations: schema
    }
  };
  
  app.use('/organizations', organizations);

  // Get our initialized service so that we can register hooks
  const service = app.service('organizations');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

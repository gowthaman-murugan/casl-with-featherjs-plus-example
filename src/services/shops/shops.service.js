
// Initializes the `shops` service on path `/shops`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../models/shops.model');
const hooks = require('./shops.hooks');
// !code: imports
const { schema } = require('./shops.schema');

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

  const shops = createService(options);
  shops.docs = {
    description: 'Service to manage shops',
    definitions: {
      'shops': {
        $ref: '#/definitions/shops'
      },
      shops: schema
    }
  };

  app.use('/shops', shops);

  // Get our initialized service so that we can register hooks
  const service = app.service('shops');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

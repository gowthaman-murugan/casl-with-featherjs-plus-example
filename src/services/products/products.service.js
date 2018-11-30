/**
 * @namespace Products
 * @memberof module:APP.Service
 */

// Initializes the `products` service on path `/products`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../models/products.model');
const hooks = require('./products.hooks');
// !code: imports 
const { schema } = require('./products.schema');

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
  
  const products = createService(options);
  products.docs = {
    description: 'Service to manage products',
    definitions: {
      'products': {
        $ref: '#/definitions/products'
      },
      products: schema
    }
  };

  // Initialize our service with any options it requires
  app.use('/products', products);

  // Get our initialized service so that we can register hooks
  const service = app.service('products');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

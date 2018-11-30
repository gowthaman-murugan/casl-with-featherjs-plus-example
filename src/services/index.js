/**
 * @namespace Service
 * @memberof module:APP
 */
// Configure the Feathers services. (Can be re-generated.)
let organizations = require('./organizations/organizations.service');
let permissions = require('./permissions/permissions.service');
let products = require('./products/products.service');
let roles = require('./roles/roles.service');
let shops = require('./shops/shops.service');
let users = require('./users/users.service');

// !code: imports // !end
// !code: init // !end

// eslint-disable-next-line no-unused-vars
let moduleExports = function (app) {
  app.configure(organizations);
  app.configure(permissions);
  app.configure(products);
  app.configure(roles);
  app.configure(shops);
  app.configure(users);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

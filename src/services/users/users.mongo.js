
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `users`. (Can be re-generated.)
const merge = require('lodash.merge');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    bsonType: "object",
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "objectId"
      },
      email: {
        bsonType: "string"
      },
      firstName: {
        bsonType: "string"
      },
      lastName: {
        bsonType: "string"
      },
      password: {
        bsonType: "string"
      },
      roles: {
        items: {
          type: "ID",
          ref: "roles"
        },
        bsonType: "array"
      },
      organizationId: {
        ref: "organizations",
        bsonType: "objectId"
      },
      createdBy: {
        ref: "users",
        bsonType: "objectId"
      },
      updatedBy: {
        ref: "users",
        bsonType: "objectId"
      }
    },
    required: [
      "email",
      "firstName",
      "lastName"
    ]
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

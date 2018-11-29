
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `permissions`. (Can be re-generated.)
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
      actions: {
        items: {
          type: "string"
        },
        bsonType: "array"
      },
      subject: {
        bsonType: "string"
      },
      conditions: {
        bsonType: "object",
        additionalProperties: false,
        properties: {
          _id: {
            bsonType: "objectId"
          }
        }
      },
      fields: {
        items: {
          type: "string"
        },
        bsonType: "array"
      },
      inverted: {
        default: "false",
        bsonType: "boolean"
      },
      reason: {
        bsonType: "string"
      },
      roleId: {
        ref: "roles",
        bsonType: "objectId"
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
      "actions",
      "subject",
      "roleId"
    ]
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

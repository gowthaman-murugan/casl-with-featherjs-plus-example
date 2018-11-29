
// Define the Feathers schema for service `permissions`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Permissions',
  description: 'Permissions database.',
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required
    "actions",
    "subject",
    "roleId",
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique
    "actions",
    "subject",
    "roleId",
    // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    actions: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    subject: {
      type: 'string'
    },
    conditions: {
      type: 'object'
    },
    fields: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    inverted: {
      type: 'boolean',
      default: 'false'
    },
    reason: {
      type: 'string'
    },
    roleId: {
      type: 'ID',
      ref: 'roles',
    },
    organizationId: {
      type: 'ID',
      ref: 'organizations'
    },
    createdBy: {
      type: 'ID',
      ref: 'users'
    },
    updatedBy: {
      type: 'ID',
      ref: 'users'
    }
    // !end
  },
  // !code: schema_more // !end
};

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'Permission',
    service: {
      sort: {
        _id: 1
      },
    },
    // sql: {
    //   sqlTable: 'Permissions',
    //   uniqueKey: '_id',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   },
    // },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !<DEFAULT> code: graphql_add
      // __author__: { type: '__User__!', args: false, relation: { ourTable: '__authorId__', otherTable: '_id' } },
      // !end
    },
    // !code: graphql_more // !end
  },
};

// !code: more // !end

let moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

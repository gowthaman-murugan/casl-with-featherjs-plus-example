
// Define the Feathers schema for service `organizations`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Organizations',
  description: 'Organizations database.',
  // !end
  // !code: schema_definitions 
  fakeRecords: 2,

  // !end

  // Required fields.
  required: [
    // !code: schema_required
    'name',
    'email'
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique
    'name',
    'email' 
    // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    email: { minLength: 8, maxLength: 40, faker: 'internet.email' },
    name: { minLength: 2, maxLength: 15, faker: 'company.companyName' },
    createdBy:{
      type : 'ID',
      ref:'users',
      faker: { fk: 'users:random'}
    },
    updatedBy:{
      type : 'ID',
      ref:'users',
      faker: { fk: 'users:random'}
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
    name: 'Organization',
    service: {
      sort: { _id: 1 },
    },
    // sql: {
    //   sqlTable: 'Organizations',
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

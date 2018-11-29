
/* eslint quotes: 0 */
// Defines Mongoose model for service `permissions`. (Can be re-generated.)
const merge = require('lodash.merge');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    actions: {
      type: [
        String
      ],
      required: true,
      unique: true
    },
    subject: {
      type: String,
      required: true,
      unique: true
    },
    conditions: {},
    fields: [
      String
    ],
    inverted: {
      type: Boolean,
      default: "false"
    },
    reason: String,
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    organizationId: mongoose.Schema.Types.ObjectId,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

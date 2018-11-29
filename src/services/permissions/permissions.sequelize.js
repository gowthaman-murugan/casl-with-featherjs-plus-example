
/* eslint quotes: 0 */
// Defines Sequelize model for service `permissions`. (Can be re-generated.)
const merge = require('lodash.merge');
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes;
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    actions: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    conditions: {
      type: DataTypes.JSONB
    },
    fields: {
      type: DataTypes.JSONB
    },
    inverted: {
      type: DataTypes.BOOLEAN,
      default: "false"
    },
    reason: {
      type: DataTypes.TEXT
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    organizationId: {
      type: DataTypes.INTEGER
    },
    createdBy: {
      type: DataTypes.INTEGER
    },
    updatedBy: {
      type: DataTypes.INTEGER
    }
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

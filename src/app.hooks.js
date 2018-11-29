
// Application hooks that run for every service. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
// eslint-disable-next-line no-unused-vars
const authorize = require('./hooks/authorize');
// !<DEFAULT> code: imports
const { authenticate } = require('@feathersjs/authentication').hooks;
const log = require('./hooks/log');
// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { when } = commonHooks;
// !end
// !code: init // !end

let moduleExports = {
  before: {
    // !<DEFAULT> code: before
    all: [ log(), when(
      hook =>
        hook.params.provider &&
         `/${hook.path}` !== hook.app.get('authentication').path,
         authenticate('jwt'),
         authorize()
    ) ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  after: {
    // !<DEFAULT> code: after
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

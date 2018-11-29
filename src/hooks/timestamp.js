
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { checkContext, getItems, replaceItems } = require('feathers-hooks-common');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {

  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, 'before', ['find', 'get', 'create', 'update', 'patch', 'remove']);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const { user } = context.params;


    try {
      if (
        context.params.provider &&
        context.path !== 'authentication' 
        ) {
        if (context.method === 'create' && context.type === 'before') {
          Object.assign(context.data, {
            createdBy: context.params.user._id.toString(),
            updatedBy: context.params.user._id.toString(),
            createdAt: new Date()
          });
        }
        if (context.method === 'update' && context.type === 'before') {
          Object.assign(context.data, {
            updatedBy: context.params.user._id.toString(),
            updatedAt: new Date()
          });
        }
      }
      return context;
    } catch (err) {
      log.error(err);
      throw err;
    }

    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.

    const records = getItems(context);

    /*
    Modify records and/or context.
     */

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw to reject the service call, or on an unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}

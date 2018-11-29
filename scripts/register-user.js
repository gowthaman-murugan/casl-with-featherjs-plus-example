/*eslint no-console: */
const app = require('../src/app');
const defaultData = require(`../data/${process.env.NODE_ENV ||
  'dev'}-data.json`);
const roleService = app.service('roles');
const userService = app.service('users');
const permissionService = app.service('permissions');

const addDefaultData = async () => {
  try {
    const roleObj = await roleService.create(defaultData.role);
    console.log('Role permission has been created successfully', roleObj);
    defaultData.user.roles = [roleObj._id];
    const userObj = await userService.create(defaultData.user);
    console.log('User permission has been created successfully', userObj);
    const permissionObj = {
      subject: 'all',
      roleId: roleObj._id,
      actions: ['manage']
    };
    const permission = await permissionService.create(permissionObj);
    console.log('Default permission has been created successfully', permission);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
addDefaultData();

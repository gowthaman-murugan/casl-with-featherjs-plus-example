# Example of CASL integration with Feathers-plus app
 This is an example application which shows how to integrate [CASL](https://stalniy.github.io/casl/).
 
 Application uses `jwt` tokens for authentication.

 Used packRules and unpackRules

 Rules are stored in [database](https://stalniy.github.io/casl/abilities/database/integration/2017/07/22/database-integration.html),while user login fetch the rules based on the roles and  help of packRules decreases serialized rules and   [storing the ability](https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html) to JWT  

 Permission logic are define in src/hooks/authorize.js. 

### Example for abilities 
  
  please refer the folder seed/db-dump.json
 
```
  "permissions": [{
       "actions": [
        "manage"
      ],
      "fields": [],
      "inverted": false,
      "subject": "all",
      "roleId": "5bffd7bb66e5320cf0e3dcd6",
     },
     
    {
       "actions": [
        "read"
      ],
      "fields": [],
      "inverted": false,
      "subject": "shop",
      "roleId": "5bffdaebc06a620d0f7572eb",
      "conditions": {
        "organizationId": "${user.organizationId}",
        "createdBy": "${user.createdBy}"
      },
     },
    {
       "actions": [
        "create",
        "update",
        "read"
      ],
      "fields": [],
      "inverted": false,
      "subject": "products",
      "roleId": "5bffdaebc06a620d0f7572eb",
      "conditions": {
        "organizationId": "${user.organizationId}",
        "createdBy": "${user.createdBy}"
      },
      "createdAt": "2018-11-29T13:29:26.483Z",
      "updatedAt": "2018-11-29T13:29:26.483Z"
    },
    { 
      "actions": [
        "delete"
      ],
      "fields": [],
      "inverted": true,
      "subject": "products",
      "roleId": "5bffdaebc06a620d0f7572ed",
      "conditions": {
        "organizationId": "${user.organizationId}",
        "createdBy": "${user.createdBy}"
      },
     }
  ]
```


## Getting Started

1. Clone the application repository
    ```
    $ git clone git@github.com:gowthaman-i2i/casl-featherjs-plus-example.git
    ```
 
2. Install your dependencies
    ```
    $ npm install
    ```

3. Start your application
    ```
    $ npm start
    ```
4. Seed default set-up
   ```
    $ npm run start:seed
   ```
    or

    Register default user, roles and permissions 
    ``` 
    $ npm run seed 
    ```
5. Documentation
   ```
    $ npm run docs
   ```
    

### API Base URL

API base URL - `http://localhost:3030/`

### API Document - Swagger

Swagger API document URL - `http://localhost:3030/docs`
 
 **Note**: You can also use [postman](https://www.getpostman.com/),I have attached the postman collection json file(CASL-FEATHERSJS-PLUS-EXAMPLE.postman_collection.json) [import your postman](https://www.getpostman.com/docs/v6/postman/collections/data_formats#exporting-and-importing-postman-data) and use. 

 
## Instruction to login
1. Create new session
```
POST http://localhost:3030/authentication
{
  "strategy": "local",
  "email": "test@test.com",
  "password": "test1234"
}

201 Created
{ "accessToken": "...." }
```

2. Put access token in `Authorization` header for all future requests

## Routes

* /shops
* /products
* /permissions
* /users
* /roles
* /authentication


## Help

For more information on all the things you can do, visit 
 1. [the generator](https://generator.feathers-plus.com/), 
 2. [feathersJS](http://docs.feathersjs.com) 
 3. [extensions](https://feathers-plus.github.io/).
 4. [authorization-with-casl-in-feathersjs](https://github.com/stalniy/casl-feathersjs-example)
 5. [casl-feathers-example](https://medium.com/@sergiy.stotskiy/authorization-with-casl-in-feathersjs-app-fd6e24eefbff)
 6. [casl-ability](https://github.com/stalniy/casl/tree/master/packages/casl-ability)
 7. [casl-mongoose](https://github.com/stalniy/casl/tree/master/packages/casl-mongoose)
 

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).

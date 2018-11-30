# Example of CASL integration in Feathers-plus app
 This is an example application which shows how to integrate [CASL](https://stalniy.github.io/casl/).
 
 Application uses `jwt` tokens for authentication.

 Rules are stored in [database](https://stalniy.github.io/casl/abilities/database/integration/2017/07/22/database-integration.html),while user login fetch  rules based on user roles and  help of packRules decreases serialized rules and   [storing the ability](https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html) to JWT  
 
This is an example application which shows how to integrate CASL in blog application. There are 3 entities:
* shops
* products
* users
* roles
* organizations
* permissions

Application uses `jwt` tokens for authentication.
Permission logic (i.e., abilities) are define in `src/hooks/abilities.js`. Rules can be specified for authenticated and anonymous users, so potentially it's quite easy to give access anonymous users to leave comments in blog.

**Note**: refactored to use CASL 2.0. See [@casl/ability][casl-ability] and [@casl/mongoose][casl-mongoose] for details.


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
 2. [FeathersJS](http://docs.feathersjs.com) 
 3. [extensions](https://feathers-plus.github.io/).
 4. [casl-feathersjs-example](https://github.com/stalniy/casl-feathersjs-example)
 5. [casl-feathers-example](https://medium.com/@sergiy.stotskiy/authorization-with-casl-in-feathersjs-app-fd6e24eefbff)
 6. [casl-ability](https://github.com/stalniy/casl/tree/master/packages/casl-ability)
 7. [casl-mongoose](https://github.com/stalniy/casl/tree/master/packages/casl-mongoose)
 

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).

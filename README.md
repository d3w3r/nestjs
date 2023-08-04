## Setup the project

- Install the nestjs cli `npm i -g @nestjs/cli`. 
- Check the version installed of nestjs `nest --version`.
- You have the documentation for help `nest --help`.
- Recomended plugings to development `prettier`, `eslint`, `editor config`.
- Validator of shapes `npm i class-validator class-transformer`
- Utility types in nestjs `npm i @nestjs/mapped-types`.

## Handling the packages with npm

- To install a specific version of a package `npm install package@version`.
- To uninstall a global package `npm uninstall -g package`.

## Commands for Nestjs-cli

- To initialize a new project `nest new project`.
- To create a controller `nest g co controllerName` the extra flag `--flat`
  creates the controller with not a folder specific for the controller the
  name is tuned to show that is a controllers like `product.controllers.js`
- To create a service `nest g s path`.
- To create a pipe `nest g pipe path`.
- To create a module `nest g mo name`.

## About using NestJS

- When we are definig routes in nestjs doesn't matter if the route that i
  specify has a starting slash or final slash all the routes omit the starting
  and the trailing slash for example `/tools/` is the same as `tools`.
- In routes when i define a dinamic route like `/products/:id` and after
  i define a static route that overlaps with the `id` like `/products/filter`
  the second route can not be interpreted beause the part `filter` is interpreted
  as the argument `id` in the first route to avoid that the static routes must
  be defined at first and the last must be the dinamically routes.
- When a controller is created with the _cli_ it creates two files one for the
  logic inside the controller and the other for unit tests, the second file has
  naming pattern like `.spec.js`, using the cli is a best option beacuse it
  connects the controllers in the main module.
- Also when a controller is created with the cli tool the new controller file
  has a definition for the enpoint so i can avoid to write the name of the global
  enpoint all around the code.
- Using the specific object `Res` and `Req` from nestjs with `Request`, `Response`
  from express we have the advantage that we see the data in the original express
  object, also we can response with that object and use all the builtin features.
- The injection of dependency of services is made into the controllers code, adding
  first of all the service then when have to declarate the service into the constructor
  with the shorthad and nest will understand that as a inyection dependenci.
- If i am using the object of express to manage the response we cannot use the
  return inside the controller to return the response that is the way that nest
  do it, so i have also manually to return that response.
- The exceptions into `@nestjs/commons` made the response for the api with status
  codes a way easy that can be implemented into services, for example to handle 
  when a search into a database has no response and want to response with the status
  code 404, there are another kinds of exeptions.
- The pipes that are another common in nestjs allows to transform and validate data
  received before enter into the controller, this are required normally to validate
  when the data comes from params, query becuase its data is received as string and
  must be transformed, the builtint pipes must be placed inside the http decorators,
  also the pipes can be customized.
- The customized pipes can be used as any other built int pipes.
- The documentation of nest specify that we should use classes instead of interfaces
  to validate the shape and types in execution time and also in development time, and
  setup the code with:
  ```javascript
    // main.ts
    import { ValidationPipe } from '@nestjs/common';
    ...
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Discard unexpected types for body
        forbidNonWhitelisted: true, // Alert for unexpected types for body
        disableErrorMessages: true, // Doesn't show error messages in production
      })
    );
    ...
  ```
- When the code is moved from the basic structure of controllers and services to a module
  we have to remove the contollers and providers inyection into the main module, also we
  have to inyect that dependencies inside each module, also i have to import into the main
  module the other modules.

## Git commands
- to clone a branch `git clone -b name url` to clone only the brach.

# TODO LIST


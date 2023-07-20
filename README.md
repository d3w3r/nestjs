## Setup the project

- Install the nestjs cli `npm i -g @nestjs/cli`. 
- Check the version installed of nestjs `nest --version`.
- You have the documentation for help `nest --help`.
- Recomended plugings to development `prettier`, `eslint`, `editor config`.

## Handling the packages with npm

- To install a specific version of a package `npm install package@version`.
- To uninstall a global package `npm uninstall -g package`.

## Commands for Nestjs-cli

- To initialize a new project `nest new project`.
- To create a controller `nest g co controllerName` the extra flag `--flat`
  creates the controller with not a folder specific for the controller the
  name is tuned to show that is a controllers like `product.controllers.js`

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

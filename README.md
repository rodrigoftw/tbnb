<h2 align="center">
  TBNB test
</h2>

<br/>

## About the project

<p>This is a project requested by the recruiting process at TurnoverBnB. The project contains two main folders, `api` and `mobile`. Each folder represents the api project and the mobile project, according to their respective names. This project considers you have a local MYSQL server up and running before proceeding.</p>

## Getting started

<p>First of all, you must install all dependencies from both projects.
On `mobile`, run `yarn` to install all its dependencies.
On `api`, run `composer install` to install all its dependencies.</p>

## API Routes

The routes created for the api are listed below:

**`GET    /products`**: Lists all products from the API;

**`GET    /products/:id`**: Retrieves one product from the API based on its `id`;

**`POST   /products`**: Creates a new product on the API;

**`PUT    /products/:id`**: Updates a product on the API;

**`DELETE /products/:id`**: Deletes a product from the API based on its `id`.

## Starting up the API

Still inside the `api` directory, run `php artisan serve` to make sure the API is up and running locally.

## Running the app

Now inside the `mobile` directory, run `yarn ios` or `yarn android` to boot your simulator or emulator and wait for the app to load and start.

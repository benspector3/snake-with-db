# snake-with-db

## Setup

* `npm i` to install `express`, `knex`, and `pg`
* Set up a Postgres DB called `snake`
* create a `config.js` file that exports a `user` and `password` for the `knexfile.js` to use.
* `npx knex migrate:latest`

## Starting the Server
* `npm i -D nodemon`
* `npm start`
# snake-with-db

## Setup

* `npm i` to install `express`, `dotenv`, `knex`, and `pg`
* `npm i -D nodemon` for running the server with hot-reload
* create a `.env` file that defines the following environment variables:

```js
PG_USER = 'your_postgres_username'
PG_PASSWORD = 'your_postgres_password'
HOST = 'localhost' // up to you
PORT = 8080 // up to you
PG_PORT = 5432 // this is standard but up to you
```

* Create a Postgres DB called `snake`
* Run `npx knex migrate:latest` to configure database

## Starting the Server
* `npm start`
// Update with your config settings.
const path = require('path');
const config = require('./config.js');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'snake',
      user: config.user,
      password: config.password,
      host: 'localhost',
      port: 5432,
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },

};

const dotenv = require('dotenv');

dotenv.config();

const config =
{
  development: {
    username: process.env.MYSQL_USERNAME_DEVELOPMENT,
    password: process.env.MYSQL_PASSWORD_DEVELOPMENT,
    database: process.env.MYSQL_DATABASE_DEVELOPMENT,
    host: process.env.MYSQL_HOST_DEVELOPMENT,
    dialect: "mysql",
    port: process.env.MYSQL_PORT_DEVELOPMENT,
    logging: false,
  },
  test: {
    username: process.env.MYSQL_USERNAME_TEST,
    password: process.env.MYSQL_PASSWORD_TEST,
    database: process.env.MYSQL_DATABASE_TEST,
    host: process.env.MYSQL_HOST_TEST,
    dialect: "mysql",
  },
  production: {
    username: process.env.MYSQL_USERNAME_PRODUCTION,
    password: process.env.MYSQL_PASSWORD_PRODUCTION,
    database: process.env.MYSQL_DATABASE_PRODUCTION,
    host: process.env.MYSQL_HOST_PRODUCTION,
    dialect: "mysql",
  }
}

module.exports = config;
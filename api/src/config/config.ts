require('dotenv').config

module.exports = {
  development: {
    url: process.env.DEV_DB_URL,
    dialect: 'postgres',
    operatorAliases: false,
  },
}

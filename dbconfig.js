const { Sequelize } = require("sequelize");
const { dataBaseConnectionString } = require('./util/url')

const URI =
    process.env.DATABASE_URL ||
    dataBaseConnectionString;

db = new Sequelize(URI, {
    logging: false,
    dialect: "postgres",
    dialectOptions: {
        /*ssl: {
          require: true,
          rejectUnauthorized: false,
        },*/
        ssl: process.env.DATABASE_URL ? { require: true, rejectUnauthorized: false } : false,
    },
});

module.exports = { db };




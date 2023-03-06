const { Sequelize } = require("sequelize");

const URI =
    process.env.DATABASE_URL ||
    "postgres://murtadha:Mortza2050@localhost:5434/iv1201_recruitment";

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




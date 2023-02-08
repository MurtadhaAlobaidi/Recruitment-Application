const Sequelize = require('sequelize')
const { db } = require('../db')
const { User } = require('firebase-functions/v1/auth')
const Person = require('./person.model') // Role model

const Availability = db.define(
  'availability',
  {
    availability_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    person_id: {
      type: Sequelize.INTEGER,
      required: true,
    },
    from_date: {
      type: Sequelize.DATE,
      required: true,
    },
    to_date: {
      type: Sequelize.DATE,
      required: true,
    },
  },
  {
    tableName: 'availability',
    timestamps: false,
  },
)

db.sync({ force: false })

module.exports = Availability
//h

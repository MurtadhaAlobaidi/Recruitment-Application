const express = require('express')
const router = express.Router()
const authenticated = require('../middleware/auth.middleware')
const { check, validationResult } = require('express-validator')
const { formErrorFormatter } = require('../util/errorFormatter')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

const { registerAvailability } = require('../controller/application.controller')
const {
  registerCompetence,
} = require('../controller/competence_profile.controller')

const { Competence } = require('../model/competence.model')
router
  /*Application List*/
  .get('/applications', authenticated, (req, res) => {
    res.render('applications', {
      user: req.user,
      error: req.flash('error'),
      form_error: req.flash('form-error'),
    })
  })

  /*Application-form*/
  .get('/application-form', authenticated, (req, res, next) => {
    res.render('application-form', {
      user: req.user,
      error: req.flash('error'),
      form_error: req.flash('form-error'),
    })
  })
  .post(
    '/application-form',
    authenticated,
    [
      check(
        'from_date',
        'You have to enter the start date of your availability period',
      ).isDate(),
      check(
        'to_date',
        'You have to enter the end date of your availability period',
      ).isDate(),
    ],

    (req, res) => {
      const { person_id } = _.pick(req.user, ['person_id'])
      const { from_date, to_date } = _.pick(req.body, ['from_date', 'to_date'])

      const {
        competence_1_start_time,
        competence_1_end_time,
        competence_2_start_time,
        competence_2_end_time,
        competence_3_start_time,
        competence_3_end_time,
      } = _.pick(req.body, [
        'competence_1_start_time',
        'competence_1_end_time',
        'competence_2_start_time',
        'competence_2_end_time',
        'competence_3_start_time',
        'competence_3_end_time',
      ])

      const calculate = (start, end) => {
        start = new Date(start)
        end = new Date(end)
        var timeDiff = end.getTime() - start.getTime()
        var diffDays = timeDiff / (1000 * 3600 * 24)
        var diffYears = diffDays / 365
        return diffYears.toFixed(1)
      }

      const years_of_experience_1 = calculate(
        competence_1_start_time,
        competence_1_end_time,
      )

      const years_of_experience_2 = calculate(
        competence_2_start_time,
        competence_2_end_time,
      )

      const years_of_experience_3 = calculate(
        competence_3_start_time,
        competence_3_end_time,
      )

      const { competences1, competences2, competences3 } = req.body
      if (competences1 === '1') {
        check(
          'competence_1_start_time',
          'You have to enter the start date of your availability period for Lotteries',
        ).isDate()
        check(
          'competence_1_end_time',
          'You have to enter the end date of your availability period for Lotteries',
        ).isDate()
        registerCompetence(person_id, 1, years_of_experience_1)
          .then((newCompetenceProfile) => {})
          .catch((error) => {
            req.flash('error', error.message)
            return res.redirect(
              '/iv1201-recruitmenapp/us-central1/app/application/application-form',
            )
          })

        // Form errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          req.flash('form-error', formErrorFormatter(errors))
          return res.redirect(
            '/iv1201-recruitmenapp/us-central1/app/application/application-form',
          )
        }
      }
      if (competences2 === '2') {
        check(
          'competence_2_start_time',
          'You have to enter the start date of your availability period for Lotteries',
        ).isDate()
        check(
          'competence_2_end_time',
          'You have to enter the end date of your availability period for Lotteries',
        ).isDate()
        registerCompetence(person_id, 2, years_of_experience_2)
          .then((newCompetenceProfile) => {})
          .catch((error) => {
            req.flash('error', error.message)
            return res.redirect(
              '/iv1201-recruitmenapp/us-central1/app/application/application-form',
            )
          })
      }

      if (competences3 === '3') {
        check(
          'competence_3_start_time',
          'You have to enter the start date of your availability period for Lotteries',
        ).isDate()
        check(
          'competence_3_end_time',
          'You have to enter the end date of your availability period for Lotteries',
        ).isDate()
        registerCompetence(person_id, 3, years_of_experience_3)
          .then((newCompetenceProfile) => {})
          .catch((error) => {
            req.flash('error', error.message)
            return res.redirect(
              '/iv1201-recruitmenapp/us-central1/app/application/application-form',
            )
          })
      }

      // Form errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        req.flash('form-error', formErrorFormatter(errors))
        return res.redirect(
          '/iv1201-recruitmenapp/us-central1/app/application/application-form',
        )
      }

      registerAvailability(person_id, from_date, to_date)
        .then((newAvailability) => {
          res.redirect(
            '/iv1201-recruitmenapp/us-central1/app/application/application-form',
          )
        })
        .catch((error) => {
          req.flash('error', error.message)
          return res.redirect(
            '/iv1201-recruitmenapp/us-central1/app/application/application-form',
          )
        })
    },
  )

module.exports = router

/* eslint-disable */
const { Router } = require('express')
const authenticated = require('../middleware/auth.middleware')
// const { encryptPasswordsInDatabase } = require('../controller/person.controller')

const router = Router()

router.get('/', authenticated, (req, res) => {
  res.render('home', {
    user: req.user,
  })
})

module.exports = router

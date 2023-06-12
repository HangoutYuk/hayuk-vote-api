const router = require('express').Router()
const { pollWeb, pollInput } = require('./controllers')

router.route('/poll/:pollId')
  .get(pollWeb)
  .post(pollInput)

module.exports = router

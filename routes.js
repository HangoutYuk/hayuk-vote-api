const router = require('express').Router()
const { voteApp, voteCreate, voteInput } = require('./controllers')

router.post('/vote/create', voteCreate)
router.route('/vote/:id')
  .get(voteApp)
  .post(voteInput)

module.exports = router

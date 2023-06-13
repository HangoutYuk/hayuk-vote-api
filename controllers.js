const { poll_list_table, poll_data_table } = require('./models')

const pollWeb = async (req, res) => {
  const poll_data = await poll_list_table.findOne({ where: { poll_id: req.params.pollId }})
  const polls = await poll_data_table.findAll({ where: { poll_id: req.params.pollId }})
  res.render('index', { pollData: poll_data, polls: polls })
} 

const pollInput = async (req, res) => {
  const add_poll_data = {
    polling_person_name: req.body.name,
    agree: req.body.vote,
    polledAt: Date.now(),
    poll_id: req.params.pollId
  }
  await poll_data_table.create(add_poll_data)
  const poll_data = await poll_list_table.findOne({ where: { poll_id: req.params.pollId }})
  const polls = await poll_data_table.findAll({ where: { poll_id: req.params.pollId }})
  res.render('index', { pollData: poll_data, polls: polls })
} 

module.exports = { pollWeb, pollInput }
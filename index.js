const app = require('./app')
const sequelize = require('./db')

// sequelize.sync().then(() => {
//   console.log('Sucessfully Synced!')
// }).catch(err => {
//   console.log(err)
// })

app.listen(8080, () => {
  console.log(`App is running on port 8080`)
})
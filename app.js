var express = require("express")
const cors = require('cors')
var app = express()
const helmet = require('helmet')
const routes = require('./routes')
var eta = require("eta")
var path = require('path')

app.engine("eta", eta.renderFile)
eta.configure({ views: "./views", cache: true })
app.set("views", "./views")
app.set("view cache", true)
app.set("view engine", "eta")
app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https://maps.googleapis.com", "https://lh3.googleusercontent.com"]
        }
    }
}))
app.use(routes)

module.exports = app

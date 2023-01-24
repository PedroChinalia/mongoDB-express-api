const express = require('express')
const routes = require('./router')
require('./config/db')

const app = express()

app.use(express.json())
app.use(routes)

app.listen(5000)
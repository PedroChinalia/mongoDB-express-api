const express = require('express')
const routes = require('./router')
var cors = require('cors')
require('./config/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(5000)
const mongoose = require('mongoose')

const UsersModelSchema = new mongoose.Schema({
    name: String,
    lastName: String
})

module.exports = mongoose.model('Users', UsersModelSchema)
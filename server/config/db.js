const mongoose = require('mongoose')

const db = 'mongodb+srv://pedrochinalia:SaPdCbRgzzrdX2er@cluster0.lz5s9j3.mongodb.net/?retryWrites=true&w=majority'

const connection = mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('strictQuery', true);

module.exports = connection
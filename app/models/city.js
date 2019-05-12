const mongoose = require('mongoose')

const CitySchema = mongoose.Schema({
    name: String
})

module.exports = mongoose.model('City', CitySchema)
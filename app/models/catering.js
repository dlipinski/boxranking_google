const mongoose = require('mongoose')

const City = require('./city.js')
const Diet = require('./diet.js')

const CateringSchema = mongoose.Schema({
    name: String,
    pageUrl: String,
    logoUrl: String,
    logoDark: Boolean,
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
    diets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diet' }],
})

module.exports = mongoose.model('Catering', CateringSchema)
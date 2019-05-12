const mongoose = require('mongoose')

const CaloriesPriceSchema = mongoose.Schema({
    calories: Number,
    price: Number
})

module.exports = mongoose.model('CaloriesPrice', CaloriesPriceSchema)
const mongoose = require('mongoose')

const CaloriesPrice = require('../models/caloriesPrice')

const DietSchema = mongoose.Schema({
    type: String,
    days: Number,
    caloriesPrices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CaloriesPrice' }]
})

module.exports = mongoose.model('Diet', DietSchema)
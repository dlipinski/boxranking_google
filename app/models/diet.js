const mongoose = require('mongoose')

const CaloriesPrice = require('../models/caloriesPrice')

const DietSchema = mongoose.Schema({
    type: String,
    caloriesPrice: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CaloriesPrice' }]
})

module.exports = mongoose.model('Diet', DietSchema)
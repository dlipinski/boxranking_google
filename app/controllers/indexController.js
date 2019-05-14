const City = require('../models/city')
const Catering = require('../models/catering')
const CaloriesPrice = require('../models/caloriesPrice')
exports.index = (req, res) => {
    City.find()
    .sort({ name: 1 })
    .exec((err, cities) => {
        
        Catering.find()
        .populate('cities')
        .populate('diets')
        .sort({ name: 1 })
        .exec((err, caterings) => {
            CaloriesPrice.populate(caterings, {
                path: 'diets.caloriesPrices'
            }, (err, cateringsPopulated) => {
                console.log(cateringsPopulated)
                res.render('index', { cities, caterings: cateringsPopulated, dietTypes: ['standard', 'sport', 'slim', 'vege'] })
            })
      
      })
	})
}

exports.indexCity = (req, res) => {
  let urlName = req.params.urlName
  City.find()
    .sort({ name: 1 })
    .exec((err, cities) => {
		res.render('index', { cities, dietTypes: ['standard', 'sport', 'slim', 'vege'], urlName })
	})
}
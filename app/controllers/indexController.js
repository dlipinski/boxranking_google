const City = require('../models/city')


exports.index = (req, res) => {
    City.find()
    .sort({ name: 1 })
    .exec((err, cities) => {
		res.render('index', { cities, dietTypes: ['standard', 'sport', 'slim', 'vege'] })
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
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
                res.render('index', { cities, caterings: cateringsPopulated, dietTypes: ['standard', 'sport', 'slim', 'vege'] })
            })
      
      })
	})
}

exports.indexCity = (req, res) => {
  let urlName = req.params.urlName
  console.log('urlname', urlName)
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
              res.render('index', {urlName, cities, caterings: cateringsPopulated, dietTypes: ['standard', 'sport', 'slim', 'vege'] })
          })
    
    })
  })
}

exports.indexSearch = (req, res) => {
  console.log('api call')
  console.log(req.body)
  res.send(JSON.stringify(req.body))
}
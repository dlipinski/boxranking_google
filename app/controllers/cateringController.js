const Catering = require('../models/catering')
const City = require('../models/city')
const Diet = require('../models/diet')
const CaloriesPrice = require('../models/caloriesPrice')

exports.getList = (req, res) => {
    Catering.find()
    .populate('cities')
    .populate('diets')
    .sort({ name: 1 })
    .exec((err, caterings) => {
        CaloriesPrice.populate(caterings, {
            path: 'diets.caloriesPrices'
        }, (err, cateringsPopulated) => {
            res.render('catering', { caterings: cateringsPopulated })
        })
	
	})
}


exports.getNew = (req, res) => {
    City.find()
    .sort({ name: 1 })
    .exec((err, cities) => {
        res.render('catering/new', { cities })
	})
}
const util = require('util')
exports.postNew = async (req, res) => {
    Catering.remove({})
    let body = req.body
    let newCatering = new Catering()
    newCatering.name = body.name
    newCatering.pageUrl = body.pageUrl
    newCatering.logoUrl = body.logoUrl
    newCatering.logoDark = body.isDark

    await City.find({ _id : { $in: body.cities } })
    .exec((err, cities) => {
		newCatering.cities = [...cities]
    })

    for (diet of body.diets) {
        let newDiet = new Diet()
        newDiet.type = diet.type
        newDiet.days = diet.days
        for (caloriesPrice of diet.caloriesPrices){
            let caloriesPriceDB = await CaloriesPrice.findOne({ calories: caloriesPrice.calories, price: caloriesPrice.price })
            if(!caloriesPriceDB){
               caloriesPriceDB = new CaloriesPrice({calories: caloriesPrice.calories, price: caloriesPrice.price})
               await caloriesPriceDB.save()
            } 
            newDiet.caloriesPrices.push(caloriesPriceDB)
        }
        await newDiet.save()
        newCatering.diets.push(newDiet)
    }

    await newCatering.save()
}


const getReqBody = () => {
    let body = { name: 'myName',
    pageUrl: 'https://dietbox.pl/',
    logoUrl: 'https://dietbox.pl/wp-content/uploads/logo.png',
    isDark: false,
    cities: [ '5cd2df4d1efe8769a4826b12', '5cd2df191efe8769a4826b11' ],
    diets: 
     [ { type: 'standard',
         caloriesPrices: 
          [ { calories: '11', price: '11' },
            { calories: '12', price: '12' },
            { calories: '13', price: '13' } ] },
       { type: 'sport',
         caloriesPrices: 
          [ { calories: '21', price: '21' },
            { calories: '22', price: '22' } ] },
       { type: 'slim',
         caloriesPrices: 
          [ { calories: '31', price: '31' },
            { calories: '32', price: '32' },
            { calories: '33', price: '33' },
            { calories: '34', price: '34' } ] },
       { type: 'vege',
         caloriesPrices: 
          [ { calories: '41', price: '41' },
            { calories: '42', price: '42' } ] } ] }
  return body
}
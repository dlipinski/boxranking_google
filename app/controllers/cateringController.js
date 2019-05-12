const Catering = require('../models/catering')
const City = require('../models/city')
const Diet = require('../models/diet')
const CaloriesPrice = require('../models/diet')


exports.getList = (req, res) => {
    Catering.find()
    .sort({ name: 1 })
    .populate('diets')
    .exec((err, caterings) => {
		res.render('catering', { caterings })
	})
}

exports.getNew = (req, res) => {
    City.find()
    .sort({ name: 1 })
    .exec((err, cities) => {
        res.render('catering/new', { cities })
	})
}

exports.postNew = async (req, res) => {
    console.log(req.body)
    let newCatering = new Catering()
    newCatering.name = req.body.name
    newCatering.pageUrl = req.body.pageUrl
    newCatering.logoUrl = req.body.logoUrl
    newCatering.logoDark = req.body.isDark
    newCatering.cities = [...req.body.cities]
    let standardDiet = new Diet()
    standardDiet.type = 'standard'
    let sportDiet = new Diet()
    sportDiet.type = 'sport'
    let slimDiet = new Diet()
    slimDiet.type = 'slim'
    let vegeDiet = new Diet()
    vegeDiet.type = 'vege'
    console.log('here')
    req.body.standard.forEach(caloriesPrice => {
        await CaloriesPrice.create(
            { calories: caloriesPrice.calories, price: caloriesPrice.diet}
        )
    })

    req.body.sport.forEach(caloriesPrice => {
        CaloriesPrice.findOneAndUpdate(
            { calories: caloriesPrice.calories, price: caloriesPrice.diet},
            {},
            { upsert: true },
            (err, x) => {
                standardDiet.caloriesPrice.push(x)
            }
        )
    })
    req.body.slim.forEach(caloriesPrice => {
        CaloriesPrice.findOneAndUpdate(
            { calories: caloriesPrice.calories, price: caloriesPrice.diet},
            {},
            { upsert: true },
            (err, x) => {
                standardDiet.caloriesPrice.push(x)
            }
        )
    })

    req.body.vege.forEach(caloriesPrice => {
        CaloriesPrice.findOneAndUpdate(
            { calories: caloriesPrice.calories, price: caloriesPrice.diet},
            {},
            { upsert: true },
            (err, x) => {
                standardDiet.caloriesPrice.push(x)
            }
        )
    })

    standardDiet.save()
    sportDiet.save()
    slimDiet.save()
    vegeDiet.save()

    newCatering.diets.push(standardDiet)
    newCatering.diets.push(sportDiet)
    newCatering.diets.push(slimDiet)
    newCatering.diets.push(vegeDiet)

    try {
		newCatering.save()
		res.redirect('/catering')
	} catch (err) {
		console.log(err)
	}
}



/* 
{ name: 'asd',
  page: 'dsad',
  logoUrl: 'dsad',
  isDark: false,
  cities: 'Gdańsk',
  standard: [],
  sport: [],
  slim: [] }
*/
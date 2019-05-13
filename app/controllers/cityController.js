const City = require('../models/city')

exports.getList = (req, res) => {
    console.log('city')
    City.find()
    .sort({ name: 1 })
    .exec((err, cities) => {
		res.render('city', { cities })
	})
}

exports.getNew = (req, res) => {
    res.render('city/new')
}

exports.postNew = (req, res) => {
    let newCity = new City()
    newCity.name = req.body.name
    newCity.urlName = makeUrlName(req.body.name)
    try {
		newCity.save()
		res.redirect('/city')
	} catch (err) {
		console.log(err)
	}
}

exports.getEdit = (req, res) => {
    City.findById(req.params.id,
        (err, city) => {
            res.render('city/edit', { city })
    })
}

exports.postEdit = (req, res) => {
    City.findOneAndUpdate(
        { _id: req.body.id },
        { 
            name: req.body.name,
            urlName: makeUrlName(req.body.name)
        },
        (err, city) => {
            res.redirect('/city')
        }
    )
}

exports.postDelete = (req, res) => {
    City.findOneAndRemove(
        { _id: req.body.id },
        (err, city) => {
            res.redirect(`/cities`)
        }
    )
}

const makeUrlName = (name) => {
    name = name.toLowerCase()
    let replaceDir = {
        'ą': 'a',
        'ć': 'c',
        'ę': 'e',
        'ł': 'l',
        'ń': 'n',
        'ó': 'o',
        'ś': 's',
        'ź': 'z',
        'ż': 'z',
        ' ': '-'
    }
    
    let urlName = ''
    for(char of name) {
        urlName += replaceDir[char] ? replaceDir[char] : char
    }

    return urlName
}
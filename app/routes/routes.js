const router = require('express').Router()

const indexController = require('../controllers/indexController')
const cityController = require('../controllers/cityController')
const cateringController = require('../controllers/cateringController')

module.exports = () => {

    /* INDEX */
    router.get('/', indexController.index)

    /* CITY */
    router.get('/city', cityController.getList)
    router.get('/city/new', cityController.getNew)
    router.post('/city/new', cityController.postNew)
    router.get('/city/:id', cityController.getEdit)
    router.post('/city/:id', cityController.postEdit)
    router.post('/city/delete', cityController.postDelete)

    /* CATERING */
    router.get('/catering', cateringController.getList)
    router.get('/catering/new', cateringController.getNew)
    router.post('/catering/new', cateringController.postNew)
    /*router.get('/catering/:id', cateringController.getEdit)
    router.post('/catering/:id', cateringController.postEdit)
    router.post('/catering/delete', cateringController.postDelete)*/

    return router
}
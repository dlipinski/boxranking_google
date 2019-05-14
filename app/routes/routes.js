const router = require('express').Router()

const indexController = require('../controllers/indexController')
const cityController = require('../controllers/cityController')
const cateringController = require('../controllers/cateringController')

module.exports = () => {

    /* INDEX */
    router.get('/', indexController.index)
    router.get('/:urlName/', indexController.indexCity)

    /* CITY */
    router.get('/admin/cities', cityController.getList)
    router.get('/admin/city/new', cityController.getNew)
    router.post('/admin/city/new', cityController.postNew)
    router.get('/admin/city/:id', cityController.getEdit)
    router.post('/admin/city/:id', cityController.postEdit)
    router.post('/admin/city/delete', cityController.postDelete)

    /* CATERING */
    router.get('/admin/caterings', cateringController.getList)
    router.get('/admin/catering/new', cateringController.getNew)
    router.post('/admin/catering/new', cateringController.postNew)
    /*router.get('/catering/:id', cateringController.getEdit)
    router.post('/catering/:id', cateringController.postEdit)
    router.post('/catering/delete', cateringController.postDelete)*/

    return router
}
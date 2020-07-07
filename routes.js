const express = require('express')
const { render } = require('nunjucks')
const routes = express.Router()

const instructors = require('./instructors')

routes.get('/', (req, res) => {
    return res.redirect('about')
})

routes.get('/instructors', (req, res) => {
    return res.render('instructors/index')
})

routes.get('/instructors/create', (req, res) => {
    return res.render('instructors/create')
})

routes.post('/instructors', instructors.post)




routes.get('/members', (req, res) => {
    return res.send('members')
})


module.exports = routes
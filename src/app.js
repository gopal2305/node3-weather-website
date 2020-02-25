const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(' ');
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// By using handlebars starts
app.get('', (req, res) => {
    res.render('index', {
        "title": "Weather App",
        "name": "My index Name"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        "title": "About App",
        "name": "My about Name"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        "title": "Help Message",
        "name": "My help Name"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            "error": "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                "forecast": forecastData,
                location,
                "address": req.query.address
            })
        })
    })

    // res.send({
    //     "forecast": "It is snowing",
    //     "location": "Philadelphia",
    //     "address": req.query.address
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            "error": "you must provide a search term"
        })
    }

    // console.log(req.query);
    // console.log(req.query.search);

    res.send({
        "products": []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        "errorMessage": "Error 404, Help article not found",
        "title": "Page 404",
        "name": "name 404"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        "errorMessage": "Error 404, Page not found",
        "title": "Page 404",
        "name": "name 404"
    })
})
// By using handlebars ends

// require = req and response = res
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         "name":"John"
//     }, {
//         "age":25
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })



app.listen(3000, () => {
    console.log('server is up on port 3000.');
})
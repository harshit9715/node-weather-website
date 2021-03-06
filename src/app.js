const path = require('path');

const request = require('postman-request');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')
const { PORT } = require('./config');

const app = express()

// Define path for express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup express static directory to serve
app.use(express.static(publicDirPath))

// Express App routes

// Home
app.get('', (req, res)=> {
    res.render('index', {
        title: "Weather",
        creator: "harshit"
    })
})

// Help 
app.get('/help', (req, res)=> {
    res.render('help', {
        title: "Help",
        description: "here is FAQs",
        creator: "harshit"
    })
})

// About
app.get('/about', (req, res)=> {
    res.render('about', {
        title: "About me",
        description: "This site was created by Harshit Gupta. It uses data from mapbox.com and weatherstack.com!",
        creator: "harshit"
    })
})

// Weather
app.get('/weather', (req, res) => {

    const {address} = req.query
    if (!address)
        return res.send({
            error: "You must provide an address."
        })
        geocode(address.toString(), (error, {latitude, longitude, location}={}) => {
            if (error) {
                return res.send({error: 'Unavailable, please try another location.'})
            }
            // console.log(latitude, longitude)
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({error: 'Unavailable, please try another location.'})
                }
                // console.log(location);
                // console.log(data);
                return res.send({
                    location,
                    forecast:data.message,
                    icon: data.icon,
                    address
                })
            })
        })
})

app.get('/products', (req, res) => {
    const {search , rating} = req.query
    if (!search)
        return res.send({
            error: "You must provide a search term."
        })
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        creator: 'harshit',
        title: '404',
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        creator: 'harshit',
        title: '404',
        error: 'Page not found!'
        
    })
})

// Start the express app.
if (PORT){
    app.listen(PORT, ()=> {
        console.log('server on port:',PORT);
    })   
}
else {
    console.log('\x1b[41m\x1b[37m%s\x1b[0m', "Create a .env file in project root and mention PORT and other API-KEYs");
}
const request = require('postman-request');

const { WEATHERSTACK_KEY } = require('../config');

const forcast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${latitude},${longitude}&units=m`
    request({url, json:true}, (error, {body}={}) => {
        if (error){
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback(body.error)
        } else {
            const data = body.current;
            console.log(data.is_day);
            callback(undefined, {
                    message:`${data.weather_descriptions[0]}, it's ${data.temperature} degrees right now! It feels like ${data.feelslike} degrees right now`,
                    icon: data.weather_icons[0]
                }
            )
        }
    })
}

module.exports = forcast
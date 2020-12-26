const request = require('postman-request');

const { MAPBOX_KEY } = require('../config');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_KEY}&limit=1`

    request({url, json:true}, (error, {body}={}) => {
        if (error){ 
            callback('Unable to connect to location service!', undefined)
        } else if (body.message || body.features.length < 1) {
            callback(body.message, undefined)
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(undefined,{latitude, longitude, location})
        }
    })
}

module.exports = geocode
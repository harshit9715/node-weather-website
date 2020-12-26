// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    WEATHERSTACK_KEY: process.env.WEATHERSTACK_KEY,
    MAPBOX_KEY: process.env.MAPBOX_KEY,
    PORT: process.env.PORT
};
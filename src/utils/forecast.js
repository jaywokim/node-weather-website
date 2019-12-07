const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/716c76e16a97f90c9a9d370a3114b1dd/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 

    request({ url, json: true}, (error, response) => {
        // console.log(response.body.currently)
        // console.log(error)
        if(error) {
            callback('unable to weather services', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {

            callback(undefined,   response.body.daily.data[0].summary + 
                ' it is currently ' + response.body.currently.temperature + 
                ' degrees out. there is a ' + response.body.currently.precipProbability + 
                '% chance of rain.' + 
                ' The high temperature is ' + response.body.daily.data[0].apparentTemperatureHigh +
                ' The low temperature is ' + response.body.daily.data[0].apparentTemperatureLow)
        }
        
    })



}

module.exports = forecast
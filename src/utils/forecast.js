const request = require('request')

//Using Destructuring
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b045c7b428178ca1759000eac4623307/' + latitude + ',' + longitude + '';

    request({ url, 'json': true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find coodinates. Try another coordinates!', undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/b045c7b428178ca1759000eac4623307/' + latitude + ',' + longitude + '';

//     request({ 'url': url, 'json': true }, (error, response) => {

//         if (error) {
//             callback('Unable to connect to weather service!', undefined);
//         }
//         else if (response.body.error) {
//             callback('Unable to find coodinates. Try another coordinates!', undefined);
//         }
//         else {
//             callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

module.exports = forecast
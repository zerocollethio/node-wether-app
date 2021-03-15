
const request = require('request');




const wether = (lat, long, callback) => {
    const urlWether = "http://api.weatherstack.com/current?access_key=a1b8a65494f227b7cb1b8a96fbe4e97b&query=" + long + "," + lat
    request({ url: urlWether, json: true }, (error, { body }) => {
        if (error) {
            callback("unabel to conect to api", undefined)
        } else if (body.error) {
            callback("unabel to fined the location please try again", undefined)
        } else {
            callback(undefined, body.current);
        }


    })

}
module.exports = wether;

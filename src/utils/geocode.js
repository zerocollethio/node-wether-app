const geocode = (name, callback) => {
    const request = require('request')
    const urlmapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(name) + ".json?access_token=pk.eyJ1IjoiemVyb2Nvb2xldGhpbyIsImEiOiJja2x1dmd6ODkwbWVlMnZvMzZ0ZHVndDM1In0.WytGK90DLt7bkv1jbtyF9g&limit=1";

    request({ url: urlmapbox, json: true }, (error, { body }) => {

        if (error) {
            callback("unable to coonect to mapbox api", undefined);
        } else if (body.features.length === 0) {
            callback("invalid location plese try again", undefined)
        } else {

            callback(undefined, {
                location: body.location,
                latitude: body.features[0].center[0],
                longtiude: body.features[0].center[1]
            })


        }
    })

}
module.exports = geocode;

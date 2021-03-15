
const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const dirPath = path.join(__dirname, '../public');
const hbspath = path.join(__dirname, '../template/views');
const partialspath = path.join(hbspath, '../partials')
const wether = require('./utils/wether.js')
const geocode = require('./utils/geocode.js')
hbs.registerPartials(partialspath);
app.set('view engine', 'hbs')
app.set('views', hbspath);

app.use(express.static(dirPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'home page'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about'
    })
})
app.get('/wether', (req, res) => {

    if (!req.query.location) {
        return res.send({
            error: "u must specifay the location"
        })
    } else {
        geocode(req.query.location, (error, { longtiude, latitude } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })

            } else {
                wether(latitude, longtiude, (error, wetherdata) => {
                    if (error) {
                        return res.send({
                            error: error
                        })
                    } else {

                        res.send({

                            latitude,
                            longtiude,
                            temprature: wetherdata.temperature
                        })
                    }

                });
            }


        })







    }

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'help page not found'
    })
})
app.get('/*', (req, res) => {
    res.render('404', {

        error: 'page not found'
    })
})
app.listen(3000, () => {
    console.log("server started on port 3000")
})
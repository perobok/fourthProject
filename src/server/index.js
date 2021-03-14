const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require("node-fetch");

const API_USERNAME_GEODATA = process.env.API_USERNAME_GEODATA
const API_KEY_PIXABAY = process.env.API_KEY_PIXABAY
const API_KEY_WEATHER = process.env.API_KEY_WEATHER

const app = express();

app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(__dirname)

//projectData = {};
//const data = [];

//GET   giving the keys to frontend
app.get('/keys', function(req, res) {
    res.send({
        API_KEY_WEATHER: API_KEY_WEATHER,
        API_USERNAME_GEODATA: API_USERNAME_GEODATA,
        API_KEY_PIXABAY: API_KEY_PIXABAY,
    });
});


app.post("/apiWeather", async function(req, res) {
    console.log("--------request_to_weatherApi_successiful---------")
    console.log(req.body.lng, req.body.lat);
    const apiWeatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
    const apiWeatherKey = process.env.API_KEY_WEATHER;
    //I saved api keys in enviroment file but for purpose of reviewing a directly inserted key in fetch.
    //const apiUrlWeather = `${apiWeatherURL}?lat=${req.body.lat}&lon=${req.body.lng}&key=${apiWeatherKey}`
    const apiUrlWeather = `${apiWeatherURL}?lat=${req.body.lat}&lon=${req.body.lng}&key=a37ee370636f4a9ea951b07969113c7e`
    let responseWeather = await fetch(apiUrlWeather)
    let dataWeather = await responseWeather.json()
    console.log(dataWeather)
    res.send(dataWeather)
})


app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
        //  res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8083, function() {
    console.log('Example app listening on port 8083!')
})

app.get('/api', function(req, res) {
    res.send(mockAPIResponse)
})

// ROUTES FOR PUTTING DATA IN OBJECT IN SERVER

//POST
app.post('/projectData', (req, res) => {
    projectData = req.body;
    data.push(projectData);
    console.log(projectData);
    console.log("I've got the request");
    res.send("message:Post received");
});
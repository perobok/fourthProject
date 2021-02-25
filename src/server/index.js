const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')


console.log(`Your API key is ${process.env.API_KEY}`);
const app = express();

app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname)


app.post("/", async function(req, res) {
    console.log("--------request_successiful---------")
    console.log(req.url.search)
    const app_key = process.env.API_KEY
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${app_key}&url=${req.url.search}&lang=en`
    let response = await fetch(apiUrl)
    let data = await response.json()

    const evaluation = {}
    evaluation.confidence = data.confidence
    evaluation.subjectivity = data.subjectivity
    evaluation.irony = data.irony
    res.send(evaluation)
})

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
        //  res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})

app.get('/api', function(req, res) {
    res.send(mockAPIResponse)
})
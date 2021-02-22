const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')


console.log(`Your API key is ${process.env.API_KEY}`);
const app = express()

app.use(express.static('dist'))

console.log(__dirname)


app.post("/test", async function(req, res) {
    const app_key = process.env.API_KEY
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${app_key}&url=${req.body.url}&lang=en`
    let response = await fetch(apiUrl)
    let data = await response.json()

    const evaluation = {}
    evaluation.polarity = data.score_tag
    evaluation.agreement = data.agreement
    evaluation.irony = data.irony
    evaluation.subjectivity = data.subjectivity
    evaluation.confidence = data.confidence
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

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})
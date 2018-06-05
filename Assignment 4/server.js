var express = require('express');
var app = express();
app.use(express.static("."));

var fs = require('fs');
var CalcMod = require('./calcModule');
var calc = new CalcMod.Calculator();
var WeatherMod = require('./weatherModule');
var weather = new WeatherMod.Weather();

app.listen(8080,function() {
    console.log('Server started...');

    //Serves the webpage from the same port to prevent CORS
    app.get('/', function (req, res) {
        console.log('Sending index page...');
        var fileStream = fs.createReadStream('./index.html');
        fileStream.pipe(res);
    });

    //Renders the calculator page
    app.get('/calc', function (req, res) {
        console.log('Sending calculator page...');
        var content = calc.render();
        console.log(content);
        res.send(content);
    });

    //GET request to calculate the nth (num) computeFactorial
    app.get('/computeFactorial', function (req,res) {
        console.log('Factorial request for ' + req.query.num +' received!');
        let number = parseInt(req.query.num); //convert string to a number

        var answer;
        if(isNaN(number) || number === null) answer = -1;
        else answer = calc.computeFactorial(number);

        if (answer === -1){
            console.log('Inappropriate n value used.');
            res.send('null');
        }
        else{
            console.log('Answer is ' + answer + '!');
            res.send(""+answer);
        }
    });

    //GET request to calculate the computeSummation from 1 to n (num)
    app.get('/computeSummation', function(req,res) {
        console.log('Summation request for ' + req.query.num + ' received!');
        let number = parseInt(req.query.num); //convert string to a number

        var answer;
        if(isNaN(number) || number === null) answer = 0;
        else answer = calc.computeSummation(number);

        if (answer === 0){
            console.log('Inappropriate n value used.');
            res.send('null');
        }
        else{
            console.log('Answer is ' + answer + '!');
            res.send(""+answer);
        }
    });

    //Renders the calculator page
    app.get('/weather', function (req, res) {
        console.log('Sending weather page...');
        var content = weather.render();
        console.log(content);
        res.send(content);
    });

    //GET request to get the weather for the next 36 hours
    app.get('/getWeather', function (req,res) {
        console.log('Weather forecast request received!');
        weather.once('weatherTable', function(msg){
            console.log(msg);
            res.send(msg);
        });
        weather.getWeather();
    });
});
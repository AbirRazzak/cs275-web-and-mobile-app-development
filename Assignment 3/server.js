var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static("."));

app.listen(8080,function(){
    console.log('Server started...');

    //Serves the webpage from the same port to prevent CORS
    app.get('/', function (req,res) {
        console.log('Sending index page...');
        var fileStream = fs.createReadStream('./amr439_hw3.html');
        fileStream.pipe(res);
    });

    //calculates the num-th factorial
    function factorial(num){
        if (num < 0) return -1;
        else if (num === 1) return 1;
        else return (num * factorial(num - 1));
    }

    //GET request to calculate the nth (num) factorial
    app.get('/factorial', function (req,res) {
        console.log('Factorial request for ' + req.query.num +' received!');
        let number = parseInt(req.query.num); //convert string to a number

        var answer;
        if(isNaN(number) || number === null) answer = -1;
        else answer = factorial(number);

        if (answer === -1){
            console.log('Inappropriate n value used.');
            res.send('null');
        }
        else{
            console.log('Answer is ' + answer + '!');
            res.send(""+answer);
        }
    });

    //calculates summation from 1 to num
    function summation(num){
        if (num >= 1) return ( (num * (num + 1)) / 2);
        else return 0;
    }

    //GET request to calculate the summation from 1 to n (num)
    app.get('/summation', function(req,res) {
        console.log('Summation request for ' + req.query.num + ' received!');
        let number = parseInt(req.query.num); //convert string to a number

        var answer;
        if(isNaN(number) || number === null) answer = 0;
        else answer = summation(number);

        if (answer === 0){
            console.log('Inappropriate n value used.');
            res.send('null');
        }
        else{
            console.log('Answer is ' + answer + '!');
            res.send(""+answer);
        }
    })
});


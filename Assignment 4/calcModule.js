'use strict'
var fs = require('fs'); //for reading in key from a file
var EventEmitter = require('events').EventEmitter;

class Calculator extends EventEmitter {
    constructor() {
        super();
    }

    //Renders the web page content for the calculator
    render() {
        var htmlFile = fs.readFileSync('./calc.html','utf8');
        return htmlFile;
    }

    //calculates the num-th computeFactorial
    computeFactorial(num){
        if (num < 0) return -1;
        else if (num === 1) return 1;
        else return (num * this.computeFactorial(num - 1));
    }

    //calculates computeSummation from 1 to num
    computeSummation(num){
        if (num >= 1) return ( (num * (num + 1)) / 2);
        else return 0;
    }
}
exports.Calculator = Calculator;
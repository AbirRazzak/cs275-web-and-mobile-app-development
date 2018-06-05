'use strict'
var fs = require('fs'); //for reading in key from a file
var http = require('http'); //for making http request to Weather Underground

var EventEmitter = require('events').EventEmitter;

var key;
var zipcode;

class Weather extends EventEmitter {
    constructor() {
        super();
        key = "1c1d720bd896962d";
        this.getZip();
    }

    //Renders the web page content for the calculator
    render() {
        var htmlFile = fs.readFileSync('./weather.html','utf8');
        return htmlFile;
    }

    //Gets current zip code
    getZip(){
        console.log('Getting current ZIP code...');

        var options = {
            host: 'api.wunderground.com',
            path: '/api/' + key + '/geolookup/q/autoip.json'
        };
        var str = '';
        var zip = '';
        http.request(options, function(response){
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function() {
                var json = JSON.parse(str);
                zipcode = json.location.zip;
                console.log(zipcode);
            });
        }).end();
    }

    //
    getWeather(){
        var options = {
            host: 'api.wunderground.com',
            path: '/api/' + key + '/hourly/q/' + zipcode + '.json'
        };
        var self = this; //need otherwise emission within the response object with be from response object
        var str = '';
        http.request(options, function(response){
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function() {
                var json = JSON.parse(str);
                console.log(json);
                var html = "";
                var forecast = json['hourly_forecast'];

                //Create table
                html += '<table data-type="table">'+
                    '<tbody>';

                for(var i=0; i<36; i++){
                    console.log("Getting info for hour #" + i);
                    var time = forecast[i]['FCTTIME']['pretty'];
                    var icon = forecast[i]['icon_url'];

                    html += '<tr>';
                        html += '<td>' + time + '</td>';
                        html += '<td>' + '<img src=\"' + icon + '\" />' + '</td>';
                    html += '</tr>';
                }

                html += '</tbody>'+
                    '</table>';

                //console.log(html);
                self.emit('weatherTable',html);
            });
        }).end();
    }
}
exports.Weather = Weather;
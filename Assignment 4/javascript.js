//On click function for calculator button
function CalcOnClick(){
    console.log("Fetching calculator page...");
    var URL = "./calc";
    console.log("Making call out to: " + URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: {},
        dataType: "text",
        success: function(msg) {
            console.log(msg);
            var res = msg;
            $("#ContentDiv").html(res);
        },
        error: function (jgXHR, textStatus,errorThrown) {
            $("#ContentDiv").html("Error: " + textStatus + " " + errorThrown);
        }
    });
}

//Processes what the calc button click does in the calculator
function CalculateOnClick(){
    let input = $("#input").val(); //gets the input value from text box
    if(document.getElementById("calcType").value === "1"){
        getSummation(input);
    }
    if(document.getElementById("calcType").value === "0"){
        getFactorial(input);
    }
}

//Fires off an Ajax call to local node server to get computeSummation value
function getSummation(value){
    console.log("Getting computeSummation for: " + value);
    var URL = "./computeSummation";
    param = {
        num: value
    };
    console.log(URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: param,
        dataType: "text",
        success: function(msg) {
            console.log(msg);
            var res = msg;
            if (res !== "null"){
                $("#output").html("The Summation from 1 to " + value + " is " + res);
            }
            else{
                $("#output").html("Invalid seed (n) used.")
            }
        },
        error: function (jgXHR, textStatus,errorThrown) {
            $("#output").html("Error: " + textStatus + " " + errorThrown);
        }
    });
}

//Fires off an Ajax call to local node server to get the computeFactorial value
function getFactorial(value) {
    console.log("Getting computeFactorial for: " + value);
    var URL = "./computeFactorial";
    var params = {
        num: value
    };
    console.log(URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        dataType: "text",
        success: function (msg) {
            console.log(msg);
            var res = msg;
            if (res !== "null") {
                $("#output").html("The Factorial of " + value + " is " + res);
            }
            else {
                $("#output").html("Invalid seed (n) used.");
            }
        },
        error: function (jgXHR, textStatus, errorThrown) {
            $("#output").html("Error: " + textStatus + " " + errorThrown);
        }
    });
}

//On click function for calculator button
function WeatherOnClick(){
    console.log("Fetching weather page...");
    var URL = "./weather";
    console.log("Making call out to: " + URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: {},
        dataType: "text",
        success: function(msg) {
            console.log(msg);
            var res = msg;
            $("#ContentDiv").html(res);
        },
        error: function (jgXHR, textStatus,errorThrown) {
            $("#ContentDiv").html("Error: " + textStatus + " " + errorThrown);
        }
    });
}

//Get weather when button is clicked
function GeoLookUp(){
    console.log("Fetching weather forecast...");
    var URL = "./getWeather";
    console.log("Making call out to: " + URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: {},
        dataType: "text",
        success: function(msg) {
            console.log(msg);
            var res = msg;
            $("#ContentDiv").html(res);
        },
        error: function (jgXHR, textStatus,errorThrown) {
            $("#ContentDiv").html("Error: " + textStatus + " " + errorThrown);
        }
    });
}
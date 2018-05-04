function buttonClick(){
    var key = document.getElementById("key").value;
    //var key = "1c1d720bd896962d";
    geoLookUp(key);
}

// geoLookUp() - finds the current zip code
// key - Wudnerground key used to run ajax calls to api
function geoLookUp(key){
    console.log("Looking for zip code using key: " + key);
    var URL = "http://api.wunderground.com/api/"+ key +"/geolookup/q/autoip.json";
    $.ajax({
        type: "GET",
        url: URL,
        contentType: "application/json; charset=utf8",
        data: "{}",
        dataType: "jsonp",
        success: function(msg) {
            console.log(msg);
            var json = msg;
            if( json.response.error==undefined) {
                var zip = json.location.zip;
                console.log("Got a zip code of " + json.location.zip);
                getHourlyForecast(key, zip);
                //return json.location.zip;
            }
            else document.getElementById("output").innerHTML = "An error occurred while fetching ZIP code.";
        },
        error: function (jgXHR, textStatus,errorThrown) {
            document.getElementById("output").innerHTML = "Error: " + textStatus + " " + errorThrown;
        }
    });
}

// getHourlyForecast() - used to get 36 hours of weather forecast
// key - Wudnerground key used to run ajax calls to api
// zip - zip code to get weather forecast for
function getHourlyForecast(key, zip){
    var URL = "http://api.wunderground.com/api/" + key + "/hourly/q/" + zip + ".json";
    console.log("Sending weather request with params, Zip: " + zip + " Key: " + key);
    $.ajax({
        type: "GET",
        url: URL,
        contentType: "application/json; charset=utf8",
        data: "{}",
        dataType: "jsonp",
        success: function(msg) {
            console.log(msg);
            var json = msg;
            document.getElementById("output").innerHTML = "";
            if( json.response.error==undefined) {
                var forecast = json['hourly_forecast'];

                //Create table
                var div = document.getElementById("output");
                div.innerHTML = ""; //empty the div before putting the table in
                var table = document.createElement("table");
                table.setAttribute("data-type", "table");

                for(var i=0; i<36; i++){
                    console.log("Getting info for hour #" + i);
                    var time = forecast[i]['FCTTIME']['pretty'];
                    var icon = forecast[i]['icon_url'];

                    var row = table.insertRow(i);
                    row.insertCell(0).innerHTML = time;
                    row.insertCell(1).innerHTML = "<img src=\"" + icon + "\" />";
                }
                div.appendChild(table);
            }
            else document.getElementById("output").innerHTML = "An error occurred while fetching hourly reports.";
        },
        error: function (jgXHR, textStatus,errorThrown) {
            document.getElementById("output").innerHTML = "Error: " + textStatus + " " + errorThrown;
        }
    });
}
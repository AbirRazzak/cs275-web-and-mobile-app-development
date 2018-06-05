//Fires off an Ajax call to local node server to get summation value
function getSummation(value){
    console.log("Getting summation for: " + value);
    var URL = "./summation";
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
                $("#output").html("The summation from 1 to " + value + " is " + res);
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

//Fires off an Ajax call to local node server to get the factorial value
function getFactorial(value){
    console.log("Getting factorial for: " + value);
    var URL = "./factorial";
    var params = {
        num: value
    };
    console.log(URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        dataType: "text",
        success: function(msg) {
            console.log(msg);
            var res = msg;
            if(res !== "null"){
                $("#output").html("The factorial of " + value + " is " + res);
            }
            else{
                $("#output").html("Invalid seed (n) used.");
            }
        },
        error: function (jgXHR, textStatus,errorThrown) {
            $("#output").html("Error: " + textStatus + " " + errorThrown);
        }
    });
}

//Processes what the page should do once the button is clicked
function buttonClick(){
    let input = $("#input").val(); //gets the input value from text box
    if(document.getElementById("calcType").value === "1"){
        getSummation(input);
    }
    if(document.getElementById("calcType").value === "0"){
        getFactorial(input);
    }
}
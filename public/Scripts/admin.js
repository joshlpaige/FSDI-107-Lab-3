//var serverURL = "http://restclass.azurewebsites.net/API/";
var serverURL = "http://localhost:8080/api/"
// object constructor
function Item(code, description, price, image, category, stock, deliveryDays){
    this.code = code;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.deliveryDays = deliveryDays;
    this.user = "Josh";
}


function clearForm(){
    $("#txtCode").val("");
    $("#txtDescription").val("");
    $("#txtPrice").val("");
    $("#txtImage").val("");
    $("#txtCategory").val("");
    $("#txtStock").val("");
    $("#txtDeliveryDays").val("");

    $("#txtCode").focus();
}

function saveItem(){
    var code = $("#txtCode").val();
    var description = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImage").val();
    var category = $("#txtCategory").val();
    var stock = $("#txtStock").val();
    var deliveryDays = $("#txtDeliveryDays").val();
    
    // create an object
    var theItem = new Item(code, description, price, image, category, stock, deliveryDays)
    var jsonString = JSON.stringify(theItem);
  
    // Object Literal

    // send the object to the server
    $.ajax({
        url: serverURL + "items",
        type: "POST",
        data: jsonString,
        contentType: "application/json",
        success: function(response){
            console.log("Yes, it works", response);

            clearForm();

            // show notification
            $("#alertSuccess").removeClass("hidden");

            // hide notification
            setTimeout(function(){
                $("#alertSuccess").addClass("hidden");
            }, 1000);

        },
        error: function(errorDetails){
            console.log("Error: ", errorDetails);
        }
    });

    

}



function testAjax(){

    // Async
    // JavaScript
    // And
    // XML com JSON


    $.ajax({
        url: serverURL + "test",
        type: 'Get',
        success: function(res){
            console.log("Payment accepted")
            console.log("Server says", res);
        },
        error: function (err){
            console.log("Comm finished")
            console.log("Error ocurred", err);
        }

    });

};




function init(){
    // console.log("This is the Admin page!!");


    $("#btnSave").click(saveItem);

    $("#txtCode").keypress(function(e){

        if(e.key == "Enter"){
            saveItem();
        }
    })

    $("#txtDescription").keypress(function(e){

        if(e.key == "Enter"){
            saveItem();
        }
    })

    $("#txtPrice").keypress(function(e){

        if(e.key == "Enter"){
            saveItem();
        }
    })

    $("#txtImage").keypress(function(e){

        if(e.key == "Enter"){
            saveItem();
        }
    })

    $("#txtCategory").keypress(function(e){

        if(e.key == "Enter"){
            saveItem();
        }
    })

    $("#txtStock").keypress(function(e){

        if(e.key == "Enter"){
            saveItem();
        }
    })

    $("#txtDeliveryDays").keypress(function(e){

        if(e.key == "Enter"){
            saveItem();
        }
    })
    
}



window.onload = init;

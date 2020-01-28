var express = require("express");
var app = express(); // create an app
var itemList = []; // store items on this array
var ItemDB;

/*********************************************************************
 *  Configuration
***********************************************************************/

//enable CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

// config body-parser to read info in request
var bparser = require('body-parser');
app.use(bparser.json());

// to server static files ( css, js, img, pdfs ) 
app.use(express.static(__dirname + '/public' ));

// to serve HTML
var ejs = require('ejs');
app.set('views', __dirname + '/public'); // location of the HTML files
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

// MongoDB connection config

var mongoose = require('mongoose');
mongoose.connect("mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var db = mongoose.connection;


/*********************************************************************
 *   Web server endpoints
***********************************************************************/

app.get('/', (req, res) => {
    res.render('catalog.html');
});

app.get('/contact', (req, res) =>{
    console.log("Someone is on the contact page");
    res.send("This will be the contact page, people working over here!!!");
});

app.get('/aboutme', (req, res) =>{
    console.log("Someone wants to know about you");
    res.send("<h1 style='color:red;'>My name is Josh Paige</h1>");
});

app.get('/about', (req, res) =>{
    console.log("They are on the about page!");
    res.render('about.html');
});

app.get('/exc/:message', (req, res) =>{
    console.log("message from client: ", req.params.message);
    var msj = req.params.message;
    var vowels = '';
    var allVowels = ['a','e','i','o','u','y'];
    //1 travel the msj string and print on the console each letter
    for(var i = 0; i<msj.length; i++){
        var letter = msj[i];
    //2 check if each letter is a vowel
        // if it is, add the vowel to the vowels string    
        if(allVowels.indexOf(letter.toLowerCase()) != -1){
            vowels += letter;
        }
        //3 (homework) return each vowel ONLY ONCE
        var filter = [new Set(vowels)];
        
    }
    
    res.status(202);
    res.send(vowels);
    console.log(filter);
    
});
/*********************************************************************
 *   API END POINTS
***********************************************************************/

app.post('/api/items', (req, res) => {
    console.log("Clients wants to store items");

    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(
        function(error, savedItem){
            if(error){
                console.log("**Error saving item", error);
                res.status(500); // internal server error
                res.send(error);
            }

            console.log("Item saved!");
            res.status(201); // 201 => created
            res.json(savedItem); // return the item as json
        }
    );   
});

app.get('/api/items', (req, res) => {
    ItemDB.find({}, function(error, data){
        if(error){
            res.status(500);
            res.send(error);
        }

        res.status(200); // ok
        res.json(data);
    });
});

/*********************************************************************
 *   START Server
 **********************************************************************/

db.on('open',function(){
    console.log("DB connection success");

    // Define structure (models) for the objects on each collection
    var itemsSchema = mongoose.Schema({
        code: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        stock: Number,
        deliveryDays: Number,
        user: String,
    });

    // create object constructor (mongoose model)
    ItemDB = mongoose.model("itemsCh6", itemsSchema);

});

db.on('error', function(){
    console.log("DB connection failed");
});

app.listen(8080, function() {
    console.log("Server running at http://localhost:8080");
    console.log("Press Ctrl+C to kill it");
});


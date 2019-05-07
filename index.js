var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));
app.use(bodyParser.json());


// ___________________________climate_stats_____________________________________

var climateAPI = require("./climate-stats-api");
const BASE_PATH = "/api";

//MongoDB--------------------------------------------------------------------------------------

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://userrobo3t:nb9eD646UtuwLR9h@mongodb-cbd-9xmsw.azure.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var climate_stats = [{}];

client.connect(err => {
  climate_stats = client.db("CBD-progetto").collection("climatestats");
  climateAPI.checkALL(app, BASE_PATH, climate_stats);
  console.log("Connected to climate-stats");
});

//_____________________________Listen port______________________________________



app.listen(port, () => {
    console.log('Connecting in port '+port);
});
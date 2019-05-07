var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));
app.use(bodyParser.json());


// ___________________________economy_stats_____________________________________

var economyAPI = require("./economy-stats-api");
const BASE_PATH = "/api";

//MongoDB--------------------------------------------------------------------------------------

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://Giuseppe:Giuseppe@sos-qhbyw.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var economy_stats = [{}];

client.connect(err => {
  economy_stats = client.db("sos1819-09").collection("economy-stats");
  economyAPI.checkALL(app, BASE_PATH, economy_stats);
  console.log("Connected to economy-stats");
});

//_____________________________Listen port______________________________________



app.listen(port, () => {
    console.log('Connecting in port '+port);
});
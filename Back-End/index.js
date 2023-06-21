require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT;

const userController = require("./controllers/userController");
const recipeController = require("./controllers/recipeController");


var LOG_PREFIX = "[" + new Date().toUTCString() + "]";
var log = console.log;

console.log = function() {

    // 1. Convert args to a normal array
    var args = Array.from(arguments);
    // OR you can use: Array.prototype.slice.call( arguments );

    // 2. Prepend log prefix log string
    args.unshift(LOG_PREFIX + ": ");

    // 3. Pass along arguments to console.log
    log.apply(console, args);
}

console.log('----------------');
console.log('Server Started');
console.log('----------------');
console.log(' ');

app.use(express.json());
app.listen(port, () => { console.log(`le serveur répond et écoute`) });
app.use(cors());


app.use("/user", userController);
app.use("/recipes", recipeController);
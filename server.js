const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require('fs')
require('dotenv').config();
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());


//adding logger initally to console
app.use(morgan(function(tokens, req, res) {
    return [
        new Date(),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms"
    ].join(" ");
}));
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(morgan(function(tokens, req, res) {
    return [
        new Date(),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms"
    ].join(" ");
}));


let mongoOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: "admin",
    dbName: "tickets",
    autoIndex: false,
};

//DB connection
mongoose.connect(process.env.MONGO_URI, mongoOptions, err => {
    if (err) console.log("Error in MongoDB connection", err.message);
    else {
        console.log(new Date(), __filename, "Connection to Mongo Server established");
    }
});



let routes = require('./routes/routes')
app.use('/', routes)

const documentation = require('./documentation/routes')
app.use('/', documentation)

app.listen(port, () => {
    console.log(new Date(), __filename, "Server started, Port : " + port);
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.mongoUrl = 'mongodb://localhost:27017/aggregationTest';
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.routes.mapRoutesToApp(this.app);
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, function (err) {
            if (err)
                throw err;
        });
        mongoose.connection.on('connected', function () { console.log('Mongoose connected'); });
        mongoose.connection.on('error', function () { console.log('Mongoose connection error'); });
        mongoose.connection.on('disconnected', function () { console.log('Mongoose connection disconnected'); });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map
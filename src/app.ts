import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";

class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    mongoUrl = 'mongodb://localhost:27017/aggregationTest';

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.routes.mapRoutesToApp(this.app);
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, function (err) {
            if (err) throw err;
        });

        mongoose.connection.on('connected', function () { console.log('Mongoose connected') });
        mongoose.connection.on('error', function () { console.log('Mongoose connection error') });
        mongoose.connection.on('disconnected', function () { console.log('Mongoose connection disconnected') });

    }
}

export default new App().app;
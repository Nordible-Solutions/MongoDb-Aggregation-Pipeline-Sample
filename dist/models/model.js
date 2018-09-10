"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
exports.companiesSchema = new Schema({
    name: String,
    lesson: ObjectId,
    user: ObjectId,
});
//# sourceMappingURL=model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    name: String,
    company: ObjectId
});
exports.user = mongoose.model('user', userSchema);
//# sourceMappingURL=user.js.map
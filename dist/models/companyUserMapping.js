"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const companyUserMappingSchema = new Schema({
    company: ObjectId,
    user: ObjectId,
});
exports.companyUserMapping = mongoose.model("companyUserMapping", companyUserMappingSchema);
//# sourceMappingURL=companyUserMapping.js.map
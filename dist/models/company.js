"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const companySchema = new Schema({
    name: String
});
exports.company = mongoose.model('company', companySchema);
//# sourceMappingURL=company.js.map
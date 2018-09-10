"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const companyLessonMappingSchema = new Schema({
    company: ObjectId,
    lesson: ObjectId,
});
exports.companyLessonMapping = mongoose.model("companyLessonMapping", companyLessonMappingSchema);
//# sourceMappingURL=companyLessonMapping.js.map
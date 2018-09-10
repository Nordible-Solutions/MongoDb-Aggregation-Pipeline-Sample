"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const lessonUserMappingSchema = new Schema({
    userId: ObjectId,
    user: String,
    lessonId: ObjectId,
    lesson: String,
    companyId: ObjectId,
    company: String,
    started: {
        type: Date,
        default: null
    },
    finished: {
        type: Date,
        default: null
    },
});
exports.lessonUserMapping = mongoose.model('lessonUserMapping', lessonUserMappingSchema);
//# sourceMappingURL=lessonUserMapping.js.map
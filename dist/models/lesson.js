"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const lessonSchema = new Schema({
    name: String,
    company: ObjectId,
    created: {
        type: Date,
        default: +new Date()
    },
    expired: {
        type: Date,
        default: +new Date() + 30 * 24 * 60 * 60 * 1000
    }
});
exports.lesson = mongoose.model('lesson', lessonSchema);
//# sourceMappingURL=lesson.js.map
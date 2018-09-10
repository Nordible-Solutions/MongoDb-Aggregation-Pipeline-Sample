"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema, ObjectId = mongoose.ObjectId;
const userLessonMappingSchema = new Schema({
    user: ObjectId,
    lesson: ObjectId
});
exports.userLessonMapping = mongoose.model('userLessonMapping', userLessonMappingSchema);
//# sourceMappingURL=userLessonMapping.js.map
import * as mongoose from "mongoose";

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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

export const lessonUserMapping = mongoose.model('lessonUserMapping', lessonUserMappingSchema);
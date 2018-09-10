import * as mongoose from "mongoose";

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const companyLessonMappingSchema = new Schema({
    company: ObjectId,
    lesson: ObjectId,
});

export const companyLessonMapping = mongoose.model("companyLessonMapping", companyLessonMappingSchema);
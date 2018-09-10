import * as mongoose from "mongoose";
import { company } from "./company";

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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

export const lesson = mongoose.model('lesson', lessonSchema);
import * as mongoose from "mongoose";

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: String,
    company: ObjectId
});

export const user = mongoose.model('user', userSchema);
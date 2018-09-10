import * as mongoose from "mongoose";

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const companySchema = new Schema({
    name: String
});

export const company = mongoose.model('company', companySchema);
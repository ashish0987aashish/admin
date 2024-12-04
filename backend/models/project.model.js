
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const projectSchema = new Schema({
  pTitle: { type: String, required: true },
  pDesc: { type: String, required: true },
  pImgs: { type: [String], required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  fullName: { type: String, required: true },
});

module.exports = mongoose.model("Project",projectSchema)
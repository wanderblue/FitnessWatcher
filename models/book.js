const mongoose = require("mongoose");
const Schema = mongoose.Schema;

;


const weightSchema = new Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  days: Number,
  date: { type: Date, default: Date.now }
});

const Weight = mongoose.model("Weight", weightSchema);


//module.exports = Book;
module.exports = Weight;

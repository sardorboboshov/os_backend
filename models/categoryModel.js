const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Category should have title"],
    unique: [true, 'Category already exists']
  },
  urlTitle: String
})

categorySchema.pre("save", function (next) {
  this.urlTitle = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Category', categorySchema)
const mongoose = require('mongoose')
const slugify = require('slugify')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product should have title'],
        unique: [true, "Product already exists"],
    },
    urlTitle: String,
    categoryTitle: {
        type: String,
        required: [true, 'Product should have category']
    },
    price: {
        type: Number,
        required:[true,'Product should have price']
    },
    quantity: {
        type: Number,
        default: 0  
    },
    isInWareHouse: {
        type: Boolean,
        default: false
    },
    arrivedAt: {
        type: Date,
        default: new Date()
    },
    expiresAt: Date,
    description: String
})

productSchema.pre("save", function (next) {
    this.urlTitle = slugify(this.title, { lower: true });
    next();
});
  
module.exports = mongoose.model("Product", productSchema);
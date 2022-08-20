const mongoose = require("mongoose");
const ratingSchema = require("./rating");
const productSchema = mongoose.Schema({
    name: {
        type: String,
        requried: true,
        trime: true,
    },

    description: {
        type: String,
        required: true,
        trime: true,
    },

    images: [
        {
            type: String,
            required: true,
        },
    ],

    quantity: {
        type: Number,
        requried: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        requried: true,
    },
    ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);
module.exports = {Product, productSchema};

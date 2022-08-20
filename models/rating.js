const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    userId: {
        type: String,
        requried: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review:{
        type: String,
    }
});

module.exports = ratingSchema;
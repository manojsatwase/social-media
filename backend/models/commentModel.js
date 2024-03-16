const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Reference to the User document who made the reply
    },
    reply: {
        type: String,
        required: true // The text content of the reply is required
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


exports.commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Reference to the User document who made the comment
    },
    comment: {
        type: String,
        required: true // The text content of the comment is required
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [replySchema]
});




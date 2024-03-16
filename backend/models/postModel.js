const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: [true, "Please provide a caption for the post"]
    },
    image:{
        public_id:String,
        url:String
    },
    // The ID of the user who created the post
    // The reference to the User document who created this post,
    // linked by its unique ObjectId
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Reference to the User document who created the post
    },
   createdAt:{
    type:Date,
    default:Date.now
   },
   likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" // Reference to users who liked the post
    }
   ],
  // Array containing comments made on this post, each comment includes the user who made it (referenced by ObjectId)
  // and the text of the comment
  comments: [{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [{
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
    }]
  }],
  //parentComment:[commentSchema] , // Nested comments within the post document 

})

module.exports = mongoose.model("Post",postSchema);
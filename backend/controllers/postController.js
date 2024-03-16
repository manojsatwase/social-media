const Post = require("../models/postModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary");

const handleErrorResponse = (res, statusCode, error = null ,message = null) => {
    return res.status(statusCode).json({
        success: false,
        message: message ||  error.message
    });
};

const handleSuccessResponse = (res,statusCode,message = "") => {
    return res.status(statusCode).json({
        success:true,
        message,
    });
}

exports.createPost = async(req,res) => {
    try{
        const {caption,image} = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"posts"
        })
    
        const newPostData = {
            caption,
            image:{
                public_id: myCloud.public_id,
                url:myCloud.secure_url
            },
            // Assigning the ID of the authenticated user to the 'owner' field.
            // 'req.user._id' contains the ID of the authenticated user extracted from the JWT token during authentication.
            owner: req.user._id

        }
        const post = await Post.create(newPostData);
        // Fetching the user document corresponding to the authenticated user.
        const user = await User.findById(req.user._id);
       // Adding the ID of the newly created post to the user's 'posts' array.
        user.posts.push(post._id);
        // Save the updated user data
        await user.save();
        handleSuccessResponse(res,201,"Post created")
        // res.status(201).json({
        //     success:true,
        //     message: "Post created",
        // })

    }catch(error){
        handleErrorResponse(res,500,error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        // please compaire this postId is match to your backend route and frontend api when api call
        const post = await Post.findById(req.params.postId);
      
        if (!post) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Post not found"
            // });
            handleErrorResponse(res,404,null,"Post not found")
        }

        // Ensure that the user is authorized to delete the post
        if (post.owner.toString() !== req.user._id.toString()) {
            // return res.status(401).json({
            //     success: false,
            //     message: "Unauthorized"
            // });
            handleErrorResponse(res,401,null,"Unauthorized")
        }
      
        // delete image from cloudinary
        await cloudinary.v2.uploader.destroy(post.image.public_id);
        // If the post exists and the user is authorized, proceed with deletion
        await post.deleteOne(); // Use deleteOne() method to remove the post

        // Remove the post ID from the user's posts array
        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        if (index !== -1) {
            user.posts.splice(index, 1);
            await user.save();
        }
        handleSuccessResponse(res,200,"Successfully deleted post")
        // return res.status(200).json({
        //     success: true,
        //     message: "Successfully deleted post"
        // });
    } catch (error) {
        handleErrorResponse(res,500,error)
    }
}

exports.likeAndUnlikePost = async (req, res) => {
    try {
       // Find the post by its ID
       const post = await Post.findById(req.params.postId);

       // Check if the post exists
       if (!post) {
           // Post does not exist
        //    return res.status(404).json({
        //         success: false,
        //         message: "Post not found"
        //     });
            handleErrorResponse(res,404,null,"Post not found") 
       }
    
        // Check if the user has already liked the post
        if (post.likes.includes(req.user._id)) {
            // If user has liked the post, unlike it
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);
            await post.save();
            handleSuccessResponse(res,200,"Post unliked.")
            // return res.status(200).json({
            //     success: true,
            //     message: "Post unliked.",
            // });
        } else {
            // If user hasn't liked the post, like it
            post.likes.push(req.user._id);
            await post.save();
            handleSuccessResponse(res,200,"Post liked.")
        }
    } catch (error) {
        // Handle any errors that occur during the process
        // return res.status(500).json({
        //     success: false,
        //     message: error.message
        // });
        handleErrorResponse(res,500,error) 
        
    }
}

exports.getPostOfFollowing = async (req,res) => {
    try {
        // first approach 
        // const user = await User.findById(req.user._id).populate("following","posts");
       
        const user = await User.findById(req.user._id);
        // better approach populate post if user is include this populate that user
        const posts = await Post.find({
            owner:{
                $in : user.following,
            }
        }).populate("owner likes comments.user");
        
        res.status(200).json({
            success:true,
            posts,
            // following:user.following
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updatecaption = async (req,res) => {
  try {
  const post = await Post.findById(req.params.postId);
 
  if(!post){
//     return res.status(404).json({
//         success:false,
//         message:"Post not found"
//     })
    handleErrorResponse(res,404,null,"Post not found");
  }
  
  // only post owner can updated the post
  // post.owner is not equal to login user
   if(post.owner.toString() !== req.user._id.toString()){
    // return res.status(401).json({
    //     success:false,
    //     message:"Unathorized"
    // })
    handleErrorResponse(res,402,null,"Unathorized")
   }

  post.caption = req.body.caption;
  await post.save();
  handleSuccessResponse(res,200,"Post Updated")
//   return res.status(200).json({
//     success:true,
//     message:"Post Updated"
//   })
  } catch (error) {
    handleErrorResponse(res,500,error);
    // res.status(500).json({
    //     success:false,
    //     message:error.message
    // })
  }
}

// single comment add and updated existing comment 


exports.commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        if (!post) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Post not found"
            // });
           handleErrorResponse(res,404,null,"Post not found");

        }
        
        // Check if the user already has a comment
        const existingComment = post.comments.find(comment => comment.user.toString() === req.user._id.toString());

        if (existingComment) {
            // Update existing comment
            existingComment.comment = req.body.comment;
        } else {
            // Add new comment
            post.comments.unshift({
                user: req.user._id,
                comment: req.body.comment
            });
        }

        // Save the post
        await post.save();
        const message = existingComment ? "Comment updated" : "Comment added"
        handleSuccessResponse(res,200,message)
        // return res.status(200).json({
        //     success: true,
        //     message: existingComment ? "Comment updated" : "Comment added",
        // });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message,
        // });
        handleErrorResponse(res,500,error);
    }
};


exports.replyToComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const post = await Post.findById(postId);
        
        if (!post) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Post not found"
            // });
            handleErrorResponse(res,404,null,"Post not found")
        }

        // Find the comment to which the reply will be added
        const comment = post.comments.find(comment => comment._id.toString() === commentId);

        if (!comment) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Comment not found"
            // });
            handleErrorResponse(res,404,null,"Comment not found")
        }

        // Add the reply to the comment's replies array
        comment.replies.unshift({
            user: req.user._id, // Assuming you have the user ID of the one replying
            reply: req.body.reply, // The reply text from the request body
        });

        // Save the post
        await post.save();
        handleSuccessResponse(res,200,"Reply added successfully")
        // return res.status(200).json({
        //     success: true,
        //     message: "Reply added successfully",
        // });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message
        // });
        handleErrorResponse(res,500,error)
    }
};


exports.deleteComment = async(req,res) => {
    try {
        
        const post = await Post.findById(req.params.postId);

        if(!post){
            // return res.status(404).json({
            //     success:false,
            //     message:"Post not found"
            // })
            handleErrorResponse(res,404,null,"Post not found")
        }
        
      // owner delete own comment or other user comment
      if(post.owner.toString() === req.user._id.toString()){
        
        if(req.body.commentId === undefined){
            // return res.status(400).json({
            //     success:false,
            //     message:"Comment Id is required"
            // })
            handleErrorResponse(res,400,null,"Post not found")
        }
    
        post.comments.forEach((item,index)=> {
            if(item._id.toString() === req.body.commentId.toString()){
                return post.comments.splice(index,1)
            }
        }) 

        await post.save();

        // return res.status(200).json({
        //     success:true,
        //     message:"Selected comment had deleted"
        // })
        handleSuccessResponse(res,200,"Selected comment had deleted");

      }else{
        // other user can delete own comment
        post.comments.forEach((item,index)=> {
            if(item.user.toString() === req.user._id.toString()){
                return post.comments.splice(index,1)
            }
        
        }) 
       await post.save();
       handleSuccessResponse(res,200,"Post deleted successfully");
    //    return res.status(200).json({
    //         success:true,
    //         message:"Your comment has deleted"
    //     })
      }

    } catch (error) {
        handleErrorResponse(res,500,error);
    }
}


exports.getmyPosts = async (req,res) => {
    try {
     const user = await User.findById(req.user._id);
     if(!user){
        // return res.status(404).json({
        //     success:false,
        //     message:"User not found"
        // })
        handleErrorResponse(res,404,null,"User not found");
     }
   
     const posts = [];

     for (const postId of user.posts) {
        const post = await Post.findById(postId).populate("likes comments.user owner comments.replies");
        if(post){
            posts.push(post);
        }
      }
    
     res.status(201).json({
        success:true,
        posts
     })
    } catch (error) {
        handleErrorResponse(res,500,error);
    }
}



exports.getUserPosts = async (req,res) => {
    try {
     const user = await User.findById(req.params.id);
     if(!user){
        // return res.status(404).json({
        //     success:false,
        //     message:"User not found"
        // })
        handleErrorResponse(res,404,null,"User not found");
     }
   
     const posts = [];

     for (const postId of user.posts) {
        const post = await Post.findById(postId).populate("likes comments.user owner comments.replies");
        if(post){
            posts.push(post);
        }
      }
    
     res.status(201).json({
        success:true,
        posts
     })
    } catch (error) {
        handleErrorResponse(res,500,error);
    }
}


















/*
exports.deleteMyPost = async(req,res) => {
    try {
    const user = await User.findById(req.user._id);
 
    if(!user){
        // return res.status(404).json({
        //     success:false,
        //     message:"User not found"
        // })
        handleErrorResponse(res,404,null,"User not found");
     }
  
     for (const postId of user.posts) {
        if (postId.toString() === req.params.postId.toString()) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    // Delete the post
                    await post.deleteOne();
                    // Remove the post ID from the user's posts array
                    user.posts = user.posts.filter(id => id.toString() !== postId.toString());
                    // Save the updated user
                    
                    await user.save();
                    // Send response
                    // return res.status(201).json({
                    //     success: true,
                    //     message: "Post deleted successfully"
                    // });
                    handleSuccessResponse(res,201,"Post deleted successfully");
                }
            } catch (error) {
               // Handle any errors that occur during the deletion process
               handleErrorResponse(res, 500, null, "Error occurred while deleting the post.");
            }
        }
    }
        
    } catch (error) {
       handleErrorResponse(res,500,error);
    }
}
*/


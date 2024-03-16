const Post = require("../models/postModel");

exports.addOrUpdateItem = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        
        // Find user's existing comment or reply
        let existingItem;
        if (req.body.comment) {
            existingItem = post.comments.find(comment => comment.user.toString() === req.user._id.toString());
        } else if (req.body.reply) {
            existingItem = post.replies.find(reply => reply.user.toString() === req.user._id.toString());
        }

        // Update existing item or add new item
        if (existingItem) {
            existingItem[req.body.comment ? 'comment' : 'reply'] = req.body.comment || req.body.reply;
        } else {
            const newItem = {
                user: req.user._id
            };
            newItem[req.body.comment ? 'comment' : 'reply'] = req.body.comment || req.body.reply;
            post[req.body.comment ? 'comments' : 'replies'].unshift(newItem);
        }

        // Save the post
        await post.save();

        return res.status(200).json({
            success: true,
            message: existingItem ? "Item updated" : "Item added"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.addComment = async (req,res) => {
    try {
        const {text} = req.body;
        const post = await Post.findById(req.params.postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        const newComment = {
            comment: text, // Update to match your schema field name
            user: req.user._id
        };
      post.comments.unshift(newComment);
    //   post.parentComment.unshift(newComment);
      await post.save();
      
      return res.status(200).json({
        success:true,
        message: "added comment successfully",
        post
      })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.addReply = async(req,res) => {
    try {
            const {text} = req.body;
            const { postId, commentId } = req.params;
        
            const post = await Post.findById(postId);

            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                });
            }
            // Find the comment within the comments array of the post document by its unique identifier (commentId)
            const comments = post?.comments.id(commentId);

            if (!comments) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found" });
            }

            const newComment = {
                user: req.user._id,
                reply: text // Update to match your schema field name
              
            };
    
           comments.replies.unshift(newComment);
           await post.save();
    
           return res.status(200).json({
            success:true,
            message: "Reply added successfully",
            post
          })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params; 
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Find the comment within the comments array of the post document by its unique identifier (commentId)
        const commentToUpdate = post?.comments.id(commentId);

        // Check if the comment exists
        if (!commentToUpdate) {
            return res.status(404).json({
                success: false,
                message: "Comment not found" 
            });
        }

        // Check if the comment was posted by the current user
        if (!commentToUpdate.user.equals(req.user._id)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User"
            });
        }

        // Update the comment text if it has changed
        if (commentToUpdate.comment !== req.body.text) {
            commentToUpdate.comment = req.body.text;
            await post.save();
        }

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            post // Optionally return the updated post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateReply = async (req,res) => {
    try {
     const {postId,commentId,replyId} = req.params;
     const post = await Post.findById(postId);
  
     if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });
    }

   // Find the comment within the comments array of the post document by its unique identifier (commentId)
   const comment = post.comments.id(commentId); // Find the comment by its ID
    if(!comment) {
        // Handle the case where the comment does not exist
        return res.status(404).json({
            success: false,
            message: "Comment not found"
        });
    }

   const replyToUpdate = comment.replies.id(replyId); // Find the reply within the comment by its ID

     // Check if the comment exists
     if (!replyToUpdate) {
        return res.status(404).json({
            success: false,
            message: "Reply Id not found"
        });
    }
   
     // Check if the comment was posted by the current user
     if (!replyToUpdate.user.equals(req.user._id)) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        });
    }

     // Update the comment text if it has changed
     if (replyToUpdate.reply !== req.body.text) {
        replyToUpdate.reply = req.body.text;
        await post.save();
    }
   
    return res.status(200).json({
        success: true,
        message: "Reply updated successfully",
        post // Optionally return the updated post
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteReplay =  async (req,res) => {
    try {
     const {postId,commentId,replyId} = req.params;
     const post = await Post.findById(postId);
  
     if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });
    }

   // Find the comment within the comments array of the post document by its unique identifier (commentId)
   const comment = post.comments.id(commentId); // Find the comment by its ID
    if(!comment) {
        // Handle the case where the comment does not exist
        return res.status(404).json({
            success: false,
            message: "Comment not found"
        });
    }

   const replyToUpdate = comment.replies.id(replyId); // Find the reply within the comment by its ID

     // Check if the comment exists
     if (!replyToUpdate) {
        return res.status(404).json({
            success: false,
            message: "Reply Id not found"
        });
    }
   
     // Check if the comment was posted by the current user
     if (!replyToUpdate.user.equals(req.user._id)) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        });
      }
      
    await replyToUpdate.deleteOne();
    await post.save();
    
   
    return res.status(200).json({
        success: true,
        message: "Reply delete successfully",
        post // Optionally return the updated post
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params; 
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Find the comment within the comments array of the post document by its unique identifier (commentId)
        const commentToUpdate = post?.comments.id(commentId);

        // Check if the comment exists
        if (!commentToUpdate) {
            return res.status(404).json({
                success: false,
                message: "Comment not found" 
            });
        }

        // Check if the comment was posted by the current user
        if (!commentToUpdate.user.equals(req.user._id)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User"
            });
        }

         await commentToUpdate.deleteOne();
         await post.save();

        return res.status(200).json({
            success: true,
            message: "delete comment successfully",
            post // Optionally return the updated post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllComments = async (req,res) => {
    try {
        const { postId } = req.params; 
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
       const comments = post?.comments;
        if(!comments){
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }
        
        return res.status(200).json({
           success:true,
           comments
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getSingleComment = async (req,res) => {
    try {
        const { postId, commentId } = req.params; 
        const post = await Post.findById(postId);
        
        // Find the comment within the comments array of the post document by its unique identifier (commentId)
        const comment = post?.comments.id(commentId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

         // Check if the comment exists
         if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found" 
            });
        }

        // Check if the comment was posted by the current user
        if (!comment.user.equals(req.user._id)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User"
            });
        }

        return res.status(200).json({
            success: true,
            comment 
        });
        
    } catch (error) {
        
    }
}




exports.addsinglecommentAndUpdated = async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
        let commentIndex = -1;
            
            post.comments.forEach((item,index) => {
                if(item.user.toString() === req.user._id.toString()){
                    commentIndex = index;
                }
            })
       
        // checking if comment already exists
        if(commentIndex !== -1){
            post.comments[commentIndex].comment = req.body.comment;

            await post.save();

            return res.status(200).json({
                success:true,
                message:"Comment updated"
             })

        }else{
            post.comments.unshift({
                user:req.user._id,
                comment:req.body.comment
            })

            await post.save();
            return res.status(200).json({
               success:true,
               message:"Comment added"
            })
        }
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        }) 
    } }


    exports.commentOnPost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId);
            
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                });
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
    
            return res.status(200).json({
                success: true,
                message: existingComment ? "Comment updated" : "Comment added"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
    

 
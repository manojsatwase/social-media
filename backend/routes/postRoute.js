const express = require("express");
const { 
    createPost,
    likeAndUnlikePost, 
    deletePost,
    getPostOfFollowing,
    updatecaption, 
    commentOnPost, 
    replyOnComment,
    replyToComment,
    deleteComment, 
    getmyPosts,
    getUserPosts,
    // deleteMyPost
} = require("../controllers/postController");
const { isAuthenticated } = require("../middlewares/auth");


const router = express.Router();

router.route("/post/create").post(isAuthenticated,createPost);

router.route("/post/:postId").get(isAuthenticated,likeAndUnlikePost).put(isAuthenticated,updatecaption).delete(isAuthenticated,deletePost);

router.route("/posts").get(isAuthenticated,getPostOfFollowing);

router.route("/userposts/:id").get(isAuthenticated,getUserPosts);

router.route("/post/comment/:postId").put(isAuthenticated,commentOnPost).delete(isAuthenticated,deleteComment);

router.post('/post/:postId/comment/:commentId/reply',isAuthenticated, replyToComment);

router.get("/me/myposts",isAuthenticated,getmyPosts);

// router.delete("/me/mypost/:postId",isAuthenticated,deleteMyPost)

// Route to add or update a comment
// router.post('/post/:postId/comments', isAuthenticated,commentOnPost);

// Route to add or update a reply
// router.post('/post/:postId/replies',isAuthenticated, replyOnComment);


//const {addComment, addReply, updateComment, updateReply ,deleteReplay,deleteComment, getAllComments, getSingleComment} = require("../controllers/commentsController");
// router.route("/post/:postId/comments").post(isAuthenticated,addComment).get(isAuthenticated,getAllComments);

// router.route("/post/:postId/comments/:commentId/reply").post(isAuthenticated,addReply);

// router.route("/post/:postId/comments/:commentId/reply/:replyId").put(isAuthenticated,updateReply).delete(isAuthenticated,deleteReplay)

// router.route("/post/:postId/comments/:commentId").get(isAuthenticated,getSingleComment).put(isAuthenticated,updateComment).delete(isAuthenticated,deleteComment);

module.exports = router;
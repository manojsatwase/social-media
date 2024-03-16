const User = require("../models/userModel");
const Post = require("../models/postModel");
const { isValidEmail } = require("../utils/validators");
const { sendEmail } = require("../middlewares/sendEmail");
const cloudinary = require("cloudinary");
const crypto = require("crypto");

exports.register = async (req, res) => {
    try {
        const { name, email, password,avatar } = req.body;

        if(!isValidEmail(email)){
            return res.status(404).json({
               success:false,
               message:"Email is not invalid"
            })
        }

        // Check if user with the same email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // const myCloud = await cloudinary.v2.uploader.upload(image,{
        //     folder:"posts"
        // })
        const myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder:"avatars"
        });

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });

        const token = await user.generateToken();
          
        const options = {
          expires:new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          httpOnly:true
        }

       // Return success response with the newly created user
        res.status(201).cookie("token",token,options).json({
            success: true,
            message: "User registered successfully",
            user,
            token
        });
    //    return res.status(201).json({
    //         success: true,
    //         message: "User registered successfully",
    //         user: newUser,
    //         token
    //     });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.login = async(req,res) => {
    try{
   const {email,password} = req.body;
   const user = await User.findOne({email}).select("+password").populate("posts followers following");

   if(!isValidEmail(email)){
    return res.status(404).json({
       success:false,
       message:"Email is not invalid"
    })
   }
    
   if(!user){
    return res.status(404).json({
        success:false,
        message:"User does not exist"
    })
  }
   
  const isMatchPassword = await user.matchPassword(password);
  
        if(!isMatchPassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }

        const token = await user.generateToken();
                
        const options = {
            expires:new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly:true
        }

        return res.status(200).cookie("token",token,options).json({
            success:true,
            user,
            token
        })

        }catch(error){
                res.status(500).json({
                    success:false,
                    message:error.message
                }) 
        }
  }

exports.logout = async(req,res) => {
    try{
        res.status(200).cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
  // In JWT, since tokens are stateless, you typically don't need to do anything here
  // Clients are responsible for discarding the token on logout

      return res.status(200).json({ message: 'Logout successful' });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.followAndUnfollowUser = async (req, res) => {
    try {
        // Find the user to be followed and the currently logged-in user
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);
        
        //Check if the user to follow exists 
        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
     
        //    // first approach for like
        //     if(loggedInUser.following.includes(userToFollow._id)){
        //         return res.status(400).json({
        //             success:false,
        //             message:"User already followed"
        //         })
        //     }

        // second approach for follow and unfollow
        if(loggedInUser.following.includes(userToFollow._id)){
            const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
            const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
        
            loggedInUser.following.splice(indexFollowing,1);
            userToFollow.followers.splice(indexFollowers,1);

            await loggedInUser.save();
            await userToFollow.save();
           
           return res.status(200).json({
                success: true,
                message: "User Unfollowed successfully"
            });
             
        }else{
             // Add the user to be followed to the following list of the logged-in user
        loggedInUser.following.push(userToFollow._id);

        // Add the logged-in user to the followers list of the user to be followed
        userToFollow.followers.push(loggedInUser._id);
        
        // Save the changes to both users
        await loggedInUser.save();
        await userToFollow.save();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "User followed successfully"
        });
        }
    
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updatedPassword = async(req,res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");
        
        const {oldPassword,newPassword} = req.body;

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Please provide old and new password."
             })
        }

        const isPasswordMatch = await user.matchPassword(oldPassword);
        
        if(!isPasswordMatch){
            res.status(400).json({
                success:false,
                message: "Incorrect Old password!"
            })
        }else{
            user.password = newPassword;
            await user.save();
           return res.status(200).json({
               success:false,
               message:"Password updated successfully"
            })
        }
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateProfile = async(req,res) => {
    try {
        const {name,email,avatar} = req.body;
        const user = await User.findById(req.user._id);

        if(name){
            user.name = name
        }
        if(email){
            if(!isValidEmail(email)){
                return res.status(404).json({
                    success:false,
                    message:"Email is not invalid"
                })
            }
          user.email = email;
        }

        // user avatar TODO

        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar,{
                folder:"avatars"
            })
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();
        
        return res.status(200).json({
            success:true,
            message:"Profile Updated",
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message 
        })
    }
}

exports.deleteMyProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const posts = user.posts;
      const followers = user.followers;
      const following = user.following;
      const userId = user._id;
  
      // Removing Avatar from cloudinary
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
      await user.deleteOne();
  
      // Logout user after deleting profile
  
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
  
      // Delete all posts of the user
      for (let i = 0; i < posts.length; i++) {
        const post = await Post.findById(posts[i]);
        await cloudinary.v2.uploader.destroy(post.image.public_id);
        await post.remove();
      }
  
      // Removing User from Followers Following
      for (let i = 0; i < followers.length; i++) {
        const follower = await User.findById(followers[i]);
  
        const index = follower.following.indexOf(userId);
        follower.following.splice(index, 1);
        await follower.save();
      }
  
      // Removing User from Following's Followers
      for (let i = 0; i < following.length; i++) {
        const follows = await User.findById(following[i]);
  
        const index = follows.followers.indexOf(userId);
        follows.followers.splice(index, 1);
        await follows.save();
      }
  
      // removing all comments of the user from all posts
      const allPosts = await Post.find();
  
      for (let i = 0; i < allPosts.length; i++) {
        const post = await Post.findById(allPosts[i]._id);
  
        for (let j = 0; j < post.comments.length; j++) {
          if (post.comments[j].user === userId) {
            post.comments.splice(j, 1);
          }
        }
        await post.save();
      }
      // removing all likes of the user from all posts
  
      for (let i = 0; i < allPosts.length; i++) {
        const post = await Post.findById(allPosts[i]._id);
  
        for (let j = 0; j < post.likes.length; j++) {
          if (post.likes[j] === userId) {
            post.likes.splice(j, 1);
          }
        }
        await post.save();
      }
  
      res.status(200).json({
        success: true,
        message: "Profile Deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  

exports.myProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._id).populate("posts followers following");

        res.status(200).json({
            success:true,
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
    const user = await User.findById(req.params.id).populate(
        "posts followers following"
    );

    if (!user) {
        return res.status(404).json({
        success: false,
        message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        user,
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


exports.getAllUsers = async(req,res) => {
    try {
        // req.params.id => '/users/:id',
        // req.query.name => '/users?name=${name}'
        // req.body.name
        // Make sure you have body-parser middleware installed 
        //and included in your Express application.
        const users = await User.find({
            name:{$regex:req.query.name,$options:"i"}
        })

        res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.forgotPassword = async(req,res) => {
    try {
        const user  = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
              success:false,
              message:"User not found"
            })
        }
        
       const resetPasswordToken = user.getResetPasswordToken();
       await user.save();

       const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;
        
       const message = `Reset Your Password by clicking on the link below 
                        <a href="${resetUrl}" target="_blank">${resetUrl}</a>`
        
       try {
        await sendEmail({
            email:user.email,
            subject:"Reset Password",
            message
        })
        return res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        }) 
       } catch (error) {
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        res.status(500).json({
            success:false,
            message:error.message
        })
       }

    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.resetPassword = async (req,res) => {
    try {
        const resetPasswordToken =  crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt:Date.now()}
        })

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Token is invalid or expired"
            })
        }

        user.password = req.body.newPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Updated password successfull"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
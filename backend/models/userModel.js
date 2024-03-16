const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // pre-denfined module need to install

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter a name"]
    },
    avatar:{
        public_id:String,
        url:String
    },
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:[true,"Email already exists"]
    },
    // Excludes this field from default query results to ensure that when accessing user data,
   // only non-sensitive fields are returned, leaving the password field hidden.
    password:{
        type:String,
        required:[true ,"Please enter a password"],
        minLength:[6,"Password must be at least 6 characters"],
        select:false // when we access user data any of user password ko chhot ke baki sab field aaj jayenge 
    },
    // Array containing references to posts authored by the user.
   // Each element in the array is a reference to a post document in the Post collection.
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post" // Reference to the Post model
        }
    ],
    // Array containing references to users who are followers of the current user.
    // Each element in the array is a reference to a user document in the User collection.
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // Reference to the User model
        }
    ],
   // Array containing references to users whom the current user is following.
   // Each element in the array is a reference to a user document in the User collection.
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // Reference to the User model
        }
    ],
    resetPasswordToken:String,
    resetPasswordExpire:Date

});


userSchema.pre("save",async function(next){
    // Middleware executed before saving a user document.
    // It hashes the user's password using bcrypt with a salt factor of 10,
    // enhancing security by storing passwords in a hashed format.
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }

    // Invokes the next middleware function in the middleware stack.
    // This ensures that the execution of the current middleware is completed
    // and allows the execution to proceed to the next middleware or the route handler.
    next();
}) 

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function() {
    const token = jwt.sign(
        { _id: this._id }, // Payload: Include the user ID
        process.env.JWT_SECRET, // Secret key for signing the token
        { expiresIn: "1d" } // Expiration time: 1 day
    );
    return token;
};

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").
                            update(resetToken).digest("hex"); // we can also use toString("hex") insted of using digest("hex")
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes valid token
  return resetToken;
}

module.exports = mongoose.model("User",userSchema);
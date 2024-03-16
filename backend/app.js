const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require("path");

// Using Middlewares
app.use(express.json({limit:"50mb"}));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({limit:"50mb",extended:true})) // alernate body-parsel
app.use(cookieParser());
// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Importing Routes
const post = require("./routes/postRoute");
const user = require("./routes/userRoute");

// Using Routes
app.use("/api/v1",post);
app.use("/api/v1",user);

app.use(express.static(path.join(__dirname,"../frontend/build")));

// all file or any route serve one file which is index.html
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})


if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"backend/config/config.env"});
}



module.exports = app;
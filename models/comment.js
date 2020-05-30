const mongoose = require('mongoose');
const  bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Create Post Schema for satisfaction
const PostSchema = new mongoose.Schema({    
    value: Number 
});

let Post = mongoose.model("Post", PostSchema);
module.exports = Post;
const mongoose = require('mongoose');
const  bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const Satisfypost = new mongoose.Schema({    
    satisfyvalue: {
        type: String,
        required: true
    },    
    comments: [{        
       text: String    
    }]
});

let Satisfy = mongoose.model("Satisfy", Satisfypost);
module.exports = Satisfy;

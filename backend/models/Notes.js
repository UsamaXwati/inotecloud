const mongoose = require('mongoose');

const UserSchema = new Schema({
    title:{
        type: String,
        required: true 
    },
    description:{
        type: email,
        required: true,    
    },
    tag:{
        type: String,
        default: "general"
    },
    date:{
        type: Date,
        required: Date.now 
    }
});

module.exports = mongoose.model('notes', NotesSchema)
  

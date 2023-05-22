const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        
      }
})



const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String
})

module.exports = {
    Signup: mongoose.model('signup', signupSchema),
    
    Comment: mongoose.model('comment', commentSchema)
}
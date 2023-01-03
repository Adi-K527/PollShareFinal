const mongoose = require("mongoose")
const { post } = require("../Routes/postRoutes")

const userSchema = mongoose.Schema ({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    createdPosts: [],
    answeredPosts: []
  })


module.exports = mongoose.model("User", userSchema)
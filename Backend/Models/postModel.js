const mongoose = require("mongoose")
const { post } = require("../Routes/postRoutes")

const postSchema = mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    questions: [{}],
    comments: [],
    numAnswers: Number,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    answeredUsers: []
  })


module.exports = mongoose.model("Post", postSchema)
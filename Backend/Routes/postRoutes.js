const express = require("express")
const router = express.Router()
const Post = require("../Models/postModel")
const User = require("../Models/userModel")


router.get("/:postid", async (req, res) => {
    const post = await Post.findById(req.params.postid)
    res.status(200).json({
        title: post.title,
        questions: post.questions,
        numAnswers: post.numAnswers,
        comments: post.comments,
    })
})

router.get("/user/:userid", async (req, res) => {
    const user = await User.findById(req.params.userid)
    const posts = await Post.find({})

    let userposts = [...user.createdPosts, ...user.answeredPosts]
    let finalposts = []

    posts.forEach(post => {
        let canpush = true
        userposts.forEach(userpost => {
            if (post._id.equals(userpost._id)){
                canpush = false
            }
        })
        if (canpush){
            finalposts.push(post)
        }
    })

    res.status(200).json(finalposts)
})


router.get("/answer/:postid", async (req, res) => {
    const post = await Post.findById(req.params.postid)
    res.status(200).json({
        title: post.title,
        questions: post.questions
    })
})


router.post("/", async (req, res) => {
    const user = await User.findById(req.body.userid)
    const postExists = await Post.findOne({title: req.body.postTitle})

    if (!postExists) {
        const post = await Post.create({title: req.body.postTitle, creator: req.body.userid, questions: req.body.questions, numAnswers: 0, comments: [], answeredUsers: []})
        user.createdPosts.push(post)
        user.save()
        res.status(200).json(post)
    }
    else {
        res.status(400).json({message: "Post already exists with that title"})
    }
})


router.put("/:id", async (req, res) => {
    const user = await User.findById(req.body.user)
    const post = await Post.findById(req.params.id)

    if (req.body.answerVals){
        let questions = []
        post.questions.forEach(question => {
            let q = question
            questions.push(q)
        })
        req.body.answerVals.forEach((answerVal, idx) => {
            questions[idx].answerchoices[answerVal].numanswers += 1
        })
        let arr = [...post.answeredUsers, user]
        let num = post.numAnswers
        num += 1
        const p = await Post.findByIdAndUpdate(req.params.id, {questions: questions, answeredUsers: arr, numAnswers: num})
        user.answeredPosts.push(p)
        user.save()
        await Post.findByIdAndUpdate(req.params.id, {questions: questions, answeredUsers: arr, numAnswers: num})
        res.status(200).json({message: "Updated"})
    }

    if (req.body.comment){
        let newcomments = post.comments
        const c = {
            creator: req.body.creator,
            comment: req.body.comment
        }
        newcomments.push(c)
        await Post.findByIdAndUpdate(req.params.id, {comments: newcomments})
        res.status(200).json({message: "Updated"})
    }
})



const updateUser2 = async (user, createdposts) => {
    await User.findByIdAndUpdate(user._id, {createdPosts: createdposts})
}

const updateUser = async (user, answeredposts, postid) => {
    const u = await User.findById(user._id)

    let aposts = []
    u.answeredPosts.forEach(post => {
        console.log(post)
        if (!post._id.equals(postid)){
            answeredposts.push(post)
        }
    })
    
    await User.findByIdAndUpdate(user._id, {answeredPosts: aposts})
} 

router.delete("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
    let arr = []
    post.answeredUsers.forEach(user => { 
        updateUser(user, arr, req.params.id)
    })

    let a = []
    const user = await User.findById(post.creator)
    user.createdPosts.forEach(cpost => {
        if (!(cpost._id.equals(req.params.id))){
            a.push(cpost)
        }
    })
    updateUser2(user, a)

    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Deleted Post"})
})


module.exports = router
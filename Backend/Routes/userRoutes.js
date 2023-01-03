const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../Models/userModel")


router.post("/register", async (req, res) => {
    const userExists = await User.findOne({username: req.body.username})
    if (!userExists){
        const hashedPassword = await bcrypt.hash(req.body.password, 10) 
        const user = await User.create({username: req.body.username, password: hashedPassword})
        res.status(200).json({ _id: user._id, username: user.username, password: user.password })
    }
    else {
        res.status(400).json({message: "User already exists"})
    }
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        res.json(user)
    }
    else {
        res.json({message: "Invalid Credentials"})
    }
})

router.get("/:id", async (req, res) => {
    const curuser = await User.findById(req.params.id)
    res.status(200).json({
        username: curuser.username,
        createdPosts: curuser.createdPosts,
        answeredPosts: curuser.answeredPosts
    })
})


module.exports = router
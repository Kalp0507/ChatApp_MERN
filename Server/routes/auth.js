const router = require('express').Router();
const User = require('../models/User')
const Message = require('../models/Message')
const bcrypt = require('bcrypt')
// Register 

router.post('/register', async (req, res) => {
    try {
        //password protacting
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        // creat a new user
        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
        });

        //save user and response
        const user = await newuser.save()
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        const validpassword = await bcrypt.compare(req.body.password, user.password)

        if (!user) {
            res.status(404).json('User not found!')

        }   //Checking user in backend
        else if (!validpassword) {
            res.status(400).json('Wrong Password!')

        }   //validation of password 
        else res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router

//Search Person

//Create Messages
router.post('/home', async (req, res) => {
    try {
        const newMessage = new Message({
            userId: req.body.userId,
            personId: req.body.personId,
            msg: req.body.msg,
            time: req.body.time
        })

        const message = await newMessage.save()
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(err)
    }
})

//Search Message
//Edit Message
//Delete Message


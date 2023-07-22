const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

//To update user
router.put('/update/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json('Account is Updated!')
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        return res
    }
})

// to get all Users and to search user by name
router.get('/all/:char', async (req, res) => {
    const char = req.params.char

    if (char === '$') {
        try {
            const users = await User.find()
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        try {
            const users = await User.find({ username: { $regex: char } })
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

// to find user by Id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//To block person
router.put('/block/:userId/:blockId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const array = user.blockArray
        array.push(req.params.blockId)
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { "blockArray": array })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//To unblock person
router.put('/unblock/:userId/:blockId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const array = user.blockArray
        let dummyArray = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== req.params.blockId) { dummyArray.push(array[i]) }
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { "blockArray": dummyArray })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//checking if person is blocked or not
router.get('/checkBlock/:userId/:blockId', async (req, res) => {
    try {
        let isBlocked = false;
        const user = await User.findById(req.params.userId)
        for (let i = 0; i < user.blockArray.length; i++) {
            if (user.blockArray[i] === req.params.blockId) {
                isBlocked = true;
            }
        }
        res.status(200).json(isBlocked)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router

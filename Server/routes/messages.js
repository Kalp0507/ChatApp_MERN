const router = require('express').Router();
const { default: axios } = require('axios');
const Msg = require('../models/Message')

router.get('/:senderId/:receiverId', async (req, res) => {

    try {
        const messages = await Msg.find({
            senderId: req.params.senderId,
            receiverId: req.params.receiverId
        })
        let msgArray = [];
        for (let index = 0; index < messages.length; index++) {
            msgArray.push(messages[index])
        }
        if (req.params.senderId !== req.params.receiverId) {
            const messages2 = await Msg.find({
                receiverId: req.params.senderId,
                senderId: req.params.receiverId
            })
            for (let index = 0; index < messages2.length; index++) {
                msgArray.push(messages2[index])
            }
        }
        // console.log(msgArray)
        res.status(200).json(msgArray);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/", async (req, res) => {
    const newMessage = new Msg(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:messageId", async (req, res) => {
    try {
        const res2 = await Msg.findByIdAndDelete(req.params.messageId)
        res.status(200).json(res2)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/starIt/:msgId", async (req, res) => {
    try {
        const starredMsg = await Msg.findByIdAndUpdate(req.params.msgId, { "isStarred": true })
        res.status(200).json(starredMsg)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
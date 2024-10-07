const express = require('express');
const Recipient = require('../models/Recipient');
const router = express.Router();

// 수신처 추가
router.post('/recipients', async (req, res) => {
    try {
        const recipient = new Recipient(req.body);
        await recipient.save();
        res.status(201).send(recipient);
    } catch (err) {
        res.status(400).send(err);
    }
});

// 수신처 조회
router.get('/recipients', async (req, res) => {
    try {
        const recipients = await Recipient.find();
        res.status(200).send(recipients);
    } catch (err) {
        res.status(400).send(err);
    }
});

// 수신처 수정
router.put('/recipients/:id', async (req, res) => {
    try {
        const recipient = await Recipient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(recipient);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

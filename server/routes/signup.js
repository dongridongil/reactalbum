// routes/signup.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// POST /reactalbum/signup
router.post('/reactalbum/signup', async (req, res) => {
    const { username, userid, password } = req.body;
    try {
        //userid 중복검사
        const existUser = await User.findOne({ userid });
        if (existUser) {
            return res.status(400).json({ message: "유저 아이디가 중복되었습니다." })
        }
        const hassPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, userid, password: hassPassword })
        await newUser.save();
        const token = jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: '1h' });



        res.status(201).json({ token, message: "아이디가 성공적으로 생성되었습니다." });
    } catch (error) {
        // 오류 처리
        console.error(error);
        res.status(500).json({ message: '서버 에러 발생!' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


router.use(bodyParser.json());
router.post('/reactalbum/login', async (req, res) => {
    const { userid, password } = req.body;
    const user = await User.findOne({ userid });

    if (!user) {
        return res.status(400).json({ message: '아이디 정보가 없습니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: '비밀번호를 틀리셨습니다.' });
    }

    const token = jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: "성공적으로 로그인 하셨습니다." });
});

module.exports = router;
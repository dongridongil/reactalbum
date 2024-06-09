const express = require('express');
const router = express.Router();


router.get('/reactalbum/protect', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: '토큰을 갖고계시지않습니다.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: '토큰 정보가 맞지 않아요' });
        }

        res.json({ message: '토큰 확인 되었습니다.' });
    });
});

module.exports = router;
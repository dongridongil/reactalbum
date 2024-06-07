const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

// CORS 설정
app.use(express.json());
app.use(cors());


app.use('/reactalbum', express.static(path.join(__dirname, '../dist')));




// API 엔드포인트 추가
app.get('/reactalbum/test', (req, res) => {
    const data = { name: "dong", age: 334 }
    res.json(data);
});






// 맨마지막에 두기...
app.get('/reactalbum/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
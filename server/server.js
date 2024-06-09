const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

// DB연결 모듈
const connect = require('./schemas');

// 몽고 디비 연결
connect();

// use 설정
app.use(express.json());
app.use(cors());
app.use('/reactalbum', express.static(path.join(__dirname, '../dist')));



//router 
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const protectRouter = require('./routes/protect');


app.use('/', signupRouter, loginRouter, protectRouter);





// 맨마지막에 두기...
app.get('/reactalbum/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 8080;


// 서버 시작
connect().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
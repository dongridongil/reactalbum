const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const { createProxyMiddleware } = require('http-proxy-middleware');
// DB연결 모듈
const connect = require('./schemas');

// 몽고 디비 연결
connect();

// use 설정
app.use(express.json());
app.use(cors());



// const corsOptions = {
//     origin: 'http://localhost:5173', // 프론트엔드가 실행되는 로컬 호스트 주소
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'] // 필요한 헤더를 명시
// };

// app.use(cors(corsOptions));

// // 모든 경로에 대해 CORS 프리플라이트 요청 처리
// app.options('*', cors(corsOptions));



app.use('/reactalbum', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.send('Hello Server');
});

//router 
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const protectRouter = require('./routes/protect');


// 각 라우터를 /reactalbum 경로에 연결
app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', protectRouter);





// 맨마지막에 두기...
app.get('/reactalbum/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});




// 서버 시작
connect().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
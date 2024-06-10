const mongoose = require('mongoose');
require('dotenv').config(); // dotenv 패키지 로드


const mongoURI = process.env.MONGO_URI;

// 몽구스 연결 함수
const connect = async () => {
    try {

        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true); // 몽고 쿼리가 콘솔에서 뜨게 한다.
        }

        await mongoose.connect(mongoURI, {
            dbName: 'photosplash' // 실제로 데이터 저장할 db명
        });

        console.log('몽고디비 연결 성공 하였습니다.');
    } catch (error) {
        console.log('몽고디비 연결 에러', error);
        process.exit(1); // 연결 실패 시 프로세스 종료
    }


    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect(); // 연결 재시도
    });
};

module.exports = connect;


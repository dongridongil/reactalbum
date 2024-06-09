import CommonHeader from '@/components/common/header/CommonHeader';

//css
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import styles from './styles/index.module.scss';
import CommonNav from '@/components/common/navigation/CommonNav';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function index() {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [errormessage, setErrormessage] = useState('');
    const navigate = useNavigate();
    const handleUserid = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserid(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        axios
            .post(
                'http://localhost:8080/reactalbum/login',
                {
                    userid,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                console.log(response.data.message);
                navigate('/reactalbum');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrormessage(error.response.data.message);
                } else {
                    setErrormessage('서버 연결에 문제가 있습니다.');
                }
            });
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };
    return (
        <div className={styles.page}>
            <CommonHeader />
            <CommonNav />
            <div className={styles.page__loginBox}>
                <h1 className={styles.page__loginBox__h1}>로그인</h1>
                <h2 className={styles.page__loginBox__h2}>재방문을 환영합니다.</h2>
                <button className={styles.page__loginBox__facebook}>
                    {'   '}
                    <FaFacebook /> Facebook 으로 로그인
                </button>
                <button className={styles.page__loginBox__google}>
                    {'   '}
                    <FcGoogle className={styles.page__loginBox__google__googleIcon} />{' '}
                    <h4 className={styles.page__loginBox__google__h4}>Google 으로 로그인</h4>
                </button>
                <button className={styles.page__loginBox__kakao}>
                    {'   '}
                    <SiKakaotalk className={styles.page__loginBox__kakao__kakaoIcon} /> KaKao 으로 로그인
                </button>

                <h2 className={styles.page__loginBox__h2}>또는</h2>
                <h3 className={styles.page__loginBox__h3}>아이디</h3>
                <input
                    className={styles.page__loginBox__input}
                    type="text"
                    id="userid"
                    value={userid}
                    onChange={handleUserid}
                    onKeyDown={handleEnter}
                />
                <h3 className={styles.page__loginBox__h3}>비밀번호</h3>
                <input
                    className={styles.page__loginBox__input}
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    onKeyDown={handleEnter}
                />
                {errormessage && <h6>{errormessage}</h6>}
                <button className={styles.page__loginBox__loginButton} onClick={handleLogin}>
                    로그인
                </button>
            </div>
            <div className={styles.page__signBox}>
                <h3 className={styles.page__signBox__h3}>
                    계정이 없으세요?{' '}
                    <a className={styles.page__signBox__a} href="/reactalbum/signup">
                        가입
                    </a>
                </h3>
            </div>
        </div>
    );
}

export default index;

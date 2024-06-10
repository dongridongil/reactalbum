import { useState } from 'react';
import styles from './styles/index.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function index() {
    //사용자 이름 아이디 비밀번호를 받아서 배열에저장한후 서버로 보내기
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleUserid = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserid(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    //서버에게 유저 정보 보내기
    const loginSubmit = () => {
        setErrorMessage(''); // 초기화
        axios
            .post('http://localhost:3000/reactalbum/signup', {
                username,
                userid,
                password,
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                navigate('/reactalbum/');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('재시도 부탁드릴게요');
                }
            });
    };

    const moveToPage = (filter: string) => {
        if (filter === 'home') navigate('/reactalbum');
        if (filter === 'login') navigate('/reactalbum/login');
    };

    return (
        <div className={styles.page}>
            <div className={styles.page__image}>
                <img src="/reactalbum/images/flower9.jpg" className={styles.page__image__img} />
                <div className={styles.page__image__overlay}>
                    <div className={styles.page__image__overlay__img}>
                        <a onClick={() => moveToPage('home')}>P</a>{' '}
                    </div>

                    <h2 className={styles.page__image__overlay__h2}>여기에서 창작 시작하기</h2>
                    <h4 className={styles.page__image__overlay__h4}>
                        다른 곳에서는 찾을 수 없는 5,825,610장의 무료 고해상도 사진을 이용해 보세요.
                    </h4>
                </div>
            </div>
            <div className={styles.page__signup}>
                <div className={styles.page__signup__box}>
                    <h2>PhotoSplash 가입</h2>
                    <h4>
                        이미 계정이 있으세요? <a onClick={() => moveToPage('login')}>로그인</a>
                    </h4>
                    <h3>사용자 이름</h3>
                    <input type="text" id="username" value={username} onChange={handleUsername} />
                    <h3>사용자 아이디</h3>
                    {errorMessage && <h6>{errorMessage}</h6>}
                    <input type="text" id="userid" value={userid} onChange={handleUserid} />
                    <h3>비밀번호</h3>
                    <input type="password" id="password" value={password} onChange={handlePassword} />
                    <button onClick={loginSubmit}>가입</button>

                    <h5>가입하는 경우, 귀하는 이용약관 및 개인정보 취급방침에 동의하는 것입니다.</h5>
                </div>
            </div>
        </div>
    );
}

export default index;

import { useNavigate } from 'react-router-dom';
import styles from './CommonHeader.module.scss';

export default function CommonHeader() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //북마크 페이지로 이동
    const moveToPage = (filter: string) => {
        if (filter === 'main') navigate('/reactalbum/');
        if (filter === 'bookmark') navigate('/reactalbum/bookmark');
        if (filter === 'login') navigate('/reactalbum/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/reactalbum/';
    };
    return (
        <header className={styles.header}>
            <div className={styles.header__logoBox} onClick={() => moveToPage('main')}>
                <img src="/reactalbum/images/image-logo.png" className={styles.header__logoBox__logo} />
                <span className={styles.header__logoBox__title}>PhotoSplash</span>
            </div>
            <div className={styles.header__profileBox}>
                {token ? (
                    <button onClick={handleLogout} className={styles.header__profileBox__login}>
                        로그아웃
                    </button>
                ) : (
                    <button onClick={() => moveToPage('login')} className={styles.header__profileBox__login}>
                        로그인
                    </button>
                )}

                <button onClick={() => moveToPage('bookmark')} className={styles.header__profileBox__button}>
                    북마크
                </button>
                <span className={styles.header__profileBox__userName}>
                    Dongil |{'  '}
                    <a href="https://velog.io/@ehddlfwkd" target="blank">
                        velog.io/@ehddlfwkd
                    </a>
                </span>
            </div>
        </header>
    );
}

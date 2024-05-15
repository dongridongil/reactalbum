import { useNavigate } from 'react-router-dom';
import styles from './CommonHeader.module.scss';

export default function CommonHeader() {
    const navigate = useNavigate();
    //북마크 페이지로 이동
    const moveToPage = (filter: string) => {
        if (filter === 'main') navigate('/reactalbum/');
        if (filter === 'bookmark') navigate('/bookmark');
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__logoBox} onClick={() => moveToPage('main')}>
                <img src="/reactalbum/images/image-logo.png" className={styles.header__logoBox__logo} />
                <span className={styles.header__logoBox__title}>PhotoSplash</span>
            </div>
            <div className={styles.header__profileBox}>
                <button className={styles.header__profileBox__button}>사진제출</button>
                <button onClick={() => moveToPage('bookmark')} className={styles.header__profileBox__button}>
                    북마크
                </button>
                <span className={styles.header__profileBox__userName}>
                    Dongil |{' '}
                    <a href="https://velog.io/@ehddlfwkd" target="blank">
                        velog.io/@ehddlfwkd
                    </a>
                </span>
            </div>
        </header>
    );
}

import CommonHeader from '@/components/common/header/CommonHeader';
import { useEffect, useState } from 'react';
import Card from './components/Card';

//css
import styles from './styles/index.module.scss';
import { CardDTO } from '../index/types/card';

function index() {
    // const [data, setData] = useState([]);

    // const getData = () => {
    //     const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));

    //     if (getLocalStorage || getLocalStorage !== null) {
    //         setData(getLocalStorage);
    //     } else {
    //         setData([]);
    //     }
    // };

    ///삭제후 재 로컬스토리지 재 렌더링
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));

        if (getLocalStorage || getLocalStorage !== null) {
            setBookmarks(getLocalStorage);
        } else {
            setBookmarks([]);
        }
    }, []);

    const deleteBookmark = (id) => {
        const updatedBookmarks = bookmarks.filter((item) => item.id !== id);
        localStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
    };

    return (
        <div className={styles.page}>
            {/* 공통 헤더 UI 부분 */}
            <CommonHeader />
            <main className={styles.page__contents}>
                {bookmarks.length === 0 ? (
                    <div className={styles.page__contents__noData}>조회 가능한 데이터가 없습니다.</div>
                ) : (
                    bookmarks.map((item: CardDTO) => {
                        return <Card prop={item} key={item.id} deleteBookmark={deleteBookmark} />;
                    })
                )}
            </main>
        </div>
    );
}

export default index;

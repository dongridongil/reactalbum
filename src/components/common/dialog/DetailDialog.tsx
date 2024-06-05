import { CardDTO, Tag } from '@/pages/index/types/card';
import styles from './DetailDialog.module.scss';
import { useEffect, useState } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({ theme: 'dark' });
interface Props {
    data: CardDTO;
    handleDialog: (eventValue: boolean) => void;
}

function DetailDialog({ data, handleDialog }: Props) {
    const [bookmark, setBookmark] = useState(false);

    //다이얼로그 끄기
    const closeDialog = () => {
        handleDialog(false);
    };
    //북마크 추가 이벤트
    const addBookmark = (selected: CardDTO) => {
        setBookmark(true);

        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));
        if (!getLocalStorage || getLocalStorage === null) {
            localStorage.setItem('bookmark', JSON.stringify([selected]));
            toast('해당 이미지를 북마크에 저장하였습니다. 😊');
        } else {
            if (getLocalStorage.findIndex((item: CardDTO) => item.id === selected.id) > -1) {
                toast('해당 이미지는 이미 북마크에 추가된 상태입니다. 😂');
            } else {
                const res = [...getLocalStorage];
                res.push(selected);
                localStorage.setItem('bookmark', JSON.stringify(res));

                toast('해당 이미지를 북마크에 저장하였습니다. 😊');
            }
        }
    };

    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));

        if (getLocalStorage && getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1) {
            setBookmark(true);
        } else if (!getLocalStorage) return;

        // Esc 키 눌렀을때 다이얼 창 닫기
        const escKeyDownCloseDialog = (event: any) => {
            if (event.key === 'Escape') {
                closeDialog();
            }
        };
        //위에 만들어놓은 escKeyDownCloseDialog를 키다운했을때 이벤트 등록 및 해지
        document.addEventListener('keydown', escKeyDownCloseDialog);
        return () => window.removeEventListener('keydown', escKeyDownCloseDialog);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.container__dialog}>
                <div className={styles.container__dialog__header}>
                    <div className={styles.close}>
                        <img
                            className={styles.close__authorImage}
                            alt="사진작가 프로필 사진"
                            src={data.user.profile_image.small}
                        />
                        <span className={styles.close__authorName}>{data.user.name}</span>
                    </div>
                    <div className={styles.bookmark}>
                        <button className={styles.bookmark__button} onClick={() => addBookmark(data)}>
                            북마크{/* 구글 아이콘을 사용  */}
                            {bookmark === false ? (
                                <span className="material-symbols-outlined" style={{ fontSize: 16 + 'px' }}>
                                    favorite
                                </span>
                            ) : (
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 16 + 'px', color: 'red' }}
                                >
                                    favorite
                                </span>
                            )}
                        </button>
                        <button className={styles.bookmark__button}> 다운로드 </button>
                    </div>
                    <button className={styles.close__button} onClick={closeDialog}>
                        {/* 구글 아이콘을 사용 */}
                        <span className="material-symbols-outlined" style={{ fontSize: 28 + 'px' }}>
                            close
                        </span>
                    </button>
                </div>

                <div className={styles.container__dialog__body}>
                    <img className={styles.image} src={data.urls.small} alt="상세 이미지" />
                </div>
                <div className={styles.container__dialog__footer}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>이미지 크기</span>
                            <span className={styles.infoBox__item__value}>
                                {data.width} X {data.height}
                            </span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>업로드</span>
                            <span className={styles.infoBox__item__value}>{data.created_at.split('T')[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                            <span className={styles.infoBox__item__value}>{data.updated_at.split('T')[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>다운로드</span>
                            <span className={styles.infoBox__item__value}>{data.likes}</span>
                        </div>
                    </div>
                    <div className={styles.tagBox}>
                        {data.tags.map((tag: Tag) => {
                            return (
                                <div key={tag.title} className={styles.tagBox__tag}>
                                    {tag.title}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailDialog;

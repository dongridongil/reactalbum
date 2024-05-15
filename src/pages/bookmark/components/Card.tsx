import { CardDTO } from '@/pages/index/types/card';
import styles from './Card.module.scss';

interface Props {
    prop: CardDTO;
    deleteBookmark: (eventValue: string) => void;
}
function Card({ prop, deleteBookmark }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.card__imageBox}>
                <img className={styles.card__imageBox__image} src={prop.urls.small} alt="" />
                <button onClick={() => deleteBookmark(prop.id)} className={styles.close__button}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24 + 'px' }}>
                        close
                    </span>
                </button>
            </div>
            <div className={styles.card__infoBox}>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>작성자</span>
                    <span className={styles.value}>{prop.user.name}</span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>이미지 크기</span>
                    <span className={styles.value}>
                        {' '}
                        {prop.width} X {prop.height}
                    </span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>업로드 날짜</span>
                    <span className={styles.value}>{prop.created_at.split('T')[0]}</span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>마지막 업데이트</span>
                    <span className={styles.value}>{prop.updated_at.split('T')[0]} </span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>다운로드 수</span>
                    <span className={styles.value}>{prop.likes}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;

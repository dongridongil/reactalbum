import { CardDTO } from '../types/card';
import styles from './Card.module.scss';
interface Props {
    data: CardDTO;
    handleDialog: (eventValue: boolean) => void;
    handleSetData: (eventValue: CardDTO) => void;
}
export default function Card({ data, handleDialog, handleSetData }: Props) {
    const openDialog = () => {
        handleDialog(true);
        handleSetData(data);
    };
    return (
        <div onClick={openDialog} className={styles.card}>
            <img src={data.urls.small} alt={data.alt_description} className={styles.card__image} />
        </div>
    );
}

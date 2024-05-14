import { useRecoilState } from 'recoil';
import { searchState } from '@/recoil/atoms/searchState';
import { useState } from 'react';
import styles from './CommonSearchBar.module.scss';
import { pageState } from '@/recoil/atoms/pageState';

export default function CommonSearchBar() {
    const [search, setSearch] = useRecoilState(searchState);
    const [text, setText] = useState('');
    const [page, setPage] = useRecoilState(pageState);
    const onChange = (event: any) => {
        setText(event.target.value);
    };
    const onSearch = () => {
        if (text === '') {
            // input 태그 안에 빈값을 검색하였을떄 => default searching
            setSearch('Korea');
            setPage(1);
        } else {
            setSearch(text); // 작성한 Input Value 값
            setPage(1);
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (text === '') {
                // input 태그 안에 빈값을 검색하였을떄 => default searching
                setSearch('Korea');
                setPage(1);
            } else {
                setSearch(text); // 작성한 Input Value 값
                setPage(1);
            }
        }
    };
    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBar__search}>
                <input
                    value={text}
                    className={styles.searchBar__search__input}
                    type="text"
                    placeholder="이미지를 검색해주세요."
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
                <img src="src/assets/icons/icon-search.svg" onClick={onSearch} onKeyDown={handleKeyDown}></img>
            </div>
        </div>
    );
}

import { selector } from 'recoil';

import axios from 'axios';
import { searchState } from '../atoms/searchState';
import { pageState } from '../atoms/pageState';
const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'fQFLF01Ul-_Fe0o3J99KZ7lCLtbCYwz_P290StMbhSA';
const PER_PAGE = 30;

export const imageData = selector({
    key: 'imageData',
    get: async ({ get }) => {
        const searchValue = get(searchState);
        const pageValue = get(pageState);

        // API 호출
        try {
            const res = await axios.get(
                `${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`
            );

            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
});

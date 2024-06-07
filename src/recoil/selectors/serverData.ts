import axios from 'axios';
import { selector } from 'recoil';

// Selector 정의
export const serverDataSelector = selector({
    key: 'serverDataSelector',
    get: async ({ get }) => {
        try {
            // 서버로부터 데이터 가져오기
            const response = await axios.get('/reactalbum/test');

            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },
});

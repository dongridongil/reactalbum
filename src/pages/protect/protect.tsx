import axios from 'axios';
import { useEffect, useState } from 'react';

function Protect() {
    const [data, setData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios
            .get('http://localhost:8080/reactalbum/protect', {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setData(response.data.message);
            })
            .catch((error) => {
                console.log('토큰 데이터가 맞지않아요', error);
            });
    }, []);

    return <div>{data}</div>;
}

export default Protect;

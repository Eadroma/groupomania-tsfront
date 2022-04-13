import { useEffect, useState } from 'react';
import { getItemLocalStorage } from './getLocalStorage';

const getUsers = () => {
    const loStorage = getItemLocalStorage();
    const [result, setResult] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            authorization: loStorage.token,
        },
    };
    useEffect(() => {
        fetch(`https://groupomania-myback.herokuapp.com/api/auth/`, options)
            .then((response) => {
                if (response.status == 401) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => setResult(response))
            .catch((error) => console.error(error));
    }, []);

    return result;
};

export default getUsers;

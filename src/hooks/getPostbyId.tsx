import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { getItemLocalStorage } from './getLocalStorage';

const getPostbyId = (id: number) => {
    const loStorage = getItemLocalStorage();
    const [result, setResult] = useState<Service<any>>({
        status: 'loading',
    });
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: loStorage.token,
        },
    };

    useEffect(() => {
        fetch(`https://groupomania-myback.herokuapp.com/api/posts/${id}`, options)
            .then((response) => {
                if (response.status == 401) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => setResult({ status: 'loaded', payload: response }))
            .catch((error) => setResult({ status: 'error', error }));
    }, []);

    return result;
};

export default getPostbyId;

import { useEffect, useState } from 'react';
import { Service } from '../types/Service';

const getPostbyId = (id: number) => {
    const [result, setResult] = useState<Service<any>>({
        status: 'loading',
    });
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        fetch(`https://groupomania-myback.herokuapp.com/api/posts/${id}`, options)
            .then((response) => response.json())
            .then((response) => setResult({ status: 'loaded', payload: response }))
            .catch((error) => setResult({ status: 'error', error }));
    }, [result]);

    return result;
};

export default getPostbyId;

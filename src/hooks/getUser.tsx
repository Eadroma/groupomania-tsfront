import { User } from '../types/User';
import { Service } from '../types/Service';
import { useEffect, useState } from 'react';
import { getItemLocalStorage } from './getLocalStorage';

const getUserbyId = (id: number) => {
    const loStorage = getItemLocalStorage();
    const [result, setResult] = useState<Service<User>>({
        status: 'loading',
    });
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                authorization: loStorage.token,
            },
        };
        fetch(`https://groupomania-myback.herokuapp.com/api/auth/${id}`, options)
            .then((response) => response.json())
            .then((response) => setResult({ status: 'loaded', payload: response }))
            .catch((error) => setResult({ status: 'error', error }));
    }, []);
    return result;
};

export default getUserbyId;

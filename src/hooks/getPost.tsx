import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Post } from '../types/Post';
import { getItemLocalStorage } from './getLocalStorage';

export interface Posts {
    map: any;
    results: Post[];
}

const getPostsbyId = (id: number) => {
    const loStorage = getItemLocalStorage();
    const [result, setResult] = useState<Service<Posts>>({
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
        fetch(`https://groupomania-myback.herokuapp.com/api/posts/user/${id}`, options)
            .then((response) => response.json())
            .then((response) => setResult({ status: 'loaded', payload: response.reverse() }))
            .catch((error) => setResult({ status: 'error', error }));
    }, [result]);

    return result;
};

export default getPostsbyId;

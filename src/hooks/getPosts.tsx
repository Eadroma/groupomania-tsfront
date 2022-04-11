import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Service } from '../types/Service';
import { getItemLocalStorage } from './getLocalStorage';

export interface Posts {
    map: any;
    result: Post[];
}

const getAllPosts = () => {
    const loStorage = getItemLocalStorage();
    const [result, setResult] = useState<Service<Posts>>({
        status: 'loading',
    });

    const options = {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            authorization: loStorage.token,
        },
    };

    useEffect(() => {
        fetch(`https://groupomania-myback.herokuapp.com/api/posts`, options)
            .then((response) => response.json())
            .then((response) => setResult({ status: 'loaded', payload: response.reverse() }))
            .catch((error) => {
                console.error(error);
                setResult({ status: 'error', error });
            });
    }, []);

    return result;
};

export default getAllPosts;

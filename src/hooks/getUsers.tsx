import { useEffect, useState } from 'react';

const getUsers = () => {
    const [result, setResult] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    };
    useEffect(() => {
        fetch(`https://groupomania-myback.herokuapp.com/api/auth/`, options)
            .then((response) => response.json())
            .then((response) => setResult(response))
            .catch((error) => console.error(error));
    }, []);

    return result;
};

export default getUsers;

import { getItemLocalStorage } from './getLocalStorage';
import { objectForm } from '../types/objectForm';

const updateUser = async (objectForm: objectForm) => {
    const loStorage = getItemLocalStorage();
    const api = `https://groupomania-myback.herokuapp.com/api/auth/${loStorage.id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: loStorage.token,
        },
        body: JSON.stringify(objectForm),
    };

    const resp = await fetch(api, options);

    if (resp.status != 201) {
        console.error('error');
        return false;
    } else {
        return true;
    }
};

export default updateUser;

export const getItemLocalStorage = () => {
    const loStorage = localStorage.getItem('user');

    if (!loStorage) return null;
    const loStorageJSON = JSON.parse(loStorage);
    return loStorageJSON;
};

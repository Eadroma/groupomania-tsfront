export const getItemLocalStorage = () => {
    let loStorage = JSON.parse(localStorage.getItem('user') || '');

    return loStorage;
};

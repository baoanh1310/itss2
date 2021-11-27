const getStorageKey = (name) => {
    return `local-${name}`;
};

class LocalStorageService {
    setLocalStorageByName = (name, value) => {
        const key = getStorageKey(name);
        const data = JSON.stringify({
            key,
            value
        })
        localStorage.setItem(key, data);
    };

    getLocalStorageByName = (name) => {
        let item = localStorage.getItem(getStorageKey(name));
        try {
            return item ? JSON.parse(item).value : null;
        } catch {

        }
    };

    removeLocalStorageByName = (name) => {
        localStorage.removeItem(getStorageKey(name));
    };

    clearAllLocalStorage = () => {
        localStorage.clear();
    }
};

export default new LocalStorageService();
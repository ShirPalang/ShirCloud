function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function setLocalStorage(key, val) {
    return localStorage.setItem(key , JSON.stringify(val))

}

export { getLocalStorage, setLocalStorage }
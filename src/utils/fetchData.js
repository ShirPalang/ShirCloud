async function fetchData(url) {
    const res = await fetch(url)
    const data = res.json()

    return data
}

export { fetchData }
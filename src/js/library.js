import { fetchData } from "../utils/fetchData.js"

async function library() {
    const container = document.querySelector('.lib-container')
    const playlist = JSON.parse(localStorage.getItem('playlist'))

    const url = 'http://localhost:3000/musics'

    let musics = []

    try {

        const allMusics = await fetchData(url)

        for (let music of allMusics) {

            for (let item of playlist) {

                if (music.id == item) {
                    musics.push(music)
                }
            }
        }

    } catch (err) {
        console.log(err);
    }

    container.innerHTML = ''

    musics.map(data => {
        const { title, artistName, audio, cover, id } = data

        container.innerHTML += `
        <card-artist 
        title="${title}" 
        cover="${cover}" 
        audio="${audio}"
        artist="${artistName}"
        id="${id}"
        class="music-card">
        <a href="/artist?artist=${artistName}" class="spa-link" slot="artist">${artistName}</a>
        </card-artist>
        `
    })
}

export default library
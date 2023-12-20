import { MuiscContainer } from "../components/music-container/music-container.js"
import { Card } from "../components/card/card.js"
import { Footer } from "../components/footer/footer.js"

import { fetchData } from "../utils/fetchData.js"

window.customElements.define('music-container', MuiscContainer)
window.customElements.define('music-card', Card)
window.customElements.define('footer-site', Footer)

const url = 'http://localhost:3000/musics'

async function home() {

    try {

        const cardsContainer = document.querySelectorAll('.cards-container')
        const musics = await fetchData(url)

        musics.map(music => {
            const { title, audio, cover, category, artistName, id } = music

            for (let container of cardsContainer) {
                if (category.includes(container.getAttribute('category'))) {
                    container.innerHTML += `
                    <music-card title="${title}"
                    cover="${cover}"
                    audio="${audio}"
                    artist="${artistName}"
                    id="${id}"
                    class="music-card">
                        <a href="/artist?artist=${artistName}" slot="artist" class="spa-link">${artistName}</a>
                    </music-card>`
                }
            }
        })


    } catch (err) {
        console.log(err);
    }
}

export default home
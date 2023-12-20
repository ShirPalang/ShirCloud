import { fetchData } from "../../utils/fetchData.js"

const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" href="src/components/Navbar-site/Navbar-site.css">
    <nav>
        <div class="navbar">
            <ul>
                <slot name="item"></slot>
                <li class="input-item"><input type="text" placeholder="Search"></li>
            </ul>
        </div>
    </nav>
`

class Navbar extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    connectedCallback() {
        const searchInput = this.shadowRoot.querySelector('input')

        searchInput.addEventListener('keyup', () => {
            document.querySelector('.search-container').innerHTML = ''

            if (searchInput.value) {
                document.querySelector('.search-container').style.display = 'block'
                document.getElementById('content').style.display = 'none'

                this.searchHandler(searchInput)

                return false
            }

            document.querySelector('.search-container').style.display = 'none'
            document.getElementById('content').style.display = 'block'
        })
    }

    searchHandler(inp) {
        let url = 'http://localhost:3000/musics'

        async function search() {
            try {
                const fragment = document.createDocumentFragment()
                const musics = await fetchData(url)
                fragment.innerHTML = ''

                const resultSuggest = musics.filter(suggest => {
                    return suggest.title.toLowerCase().includes(inp.value.toLowerCase())
                })

                let i = 0

                for (let result of resultSuggest) {

                    const { artistName, audio, cover, title, id } = result

                    fragment.innerHTML += `
                    <card-artist 
                    title="${title}" 
                    cover="${cover}" 
                    audio="${audio}"
                    artist="${artistName}"
                    id="${id}"
                    class="music-card">
                        <a href="/artist?artist=${artistName}" class="spa-link link" slot="artist">${artistName}</a>
                    </card-artist>`

                    i++
                    if (i == 20)
                        break
                }

                document.querySelector('.search-container').innerHTML = fragment.innerHTML

                emptyInp(inp)

            } catch (err) {
                console.log(err);
            }
        }

        function emptyInp(inp) {
            const linkElem = document.querySelectorAll('.link')

            for (let link of linkElem) {

                link.addEventListener('click', () => {
                    inp.value = ''

                    document.querySelector('.search-container').style.display = 'none'
                    document.getElementById('content').style.display = 'block'
                })
            }
        }

        search()
    }
}

export { Navbar }
const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" href="src/components/music-container/music.container.css">
    <div class="music-container">
        <div class="header">
            <h1 class="title"></h1>
            <div class="buttons">
                <button id="more">more</button>
                <button id="toBack"><</button>
                <button id="toForward">></button>
            </div>
        </div>
        
        <slot name="cards-container" id="cards-container"></slot>
    </div>
`

let counter = 0

class MuiscContainer extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.counter = counter
    }

    connectedCallback() {
        const title = this.shadowRoot.querySelector('.title')
        const forwardBtn = this.shadowRoot.getElementById('toForward')
        const backBtn = this.shadowRoot.getElementById('toBack')
        const moreBtn = this.shadowRoot.getElementById('moreBtn')

        counter++

        title.innerHTML = this.getAttribute('title')

        forwardBtn.addEventListener('click', () => {
            document.querySelectorAll('.cards-container')[this.counter].scrollBy(1200, 0)
        })
        backBtn.addEventListener('click', () => {
            document.querySelectorAll('.cards-container')[this.counter].scrollBy(-1200, 0)
        })
    }

    disconnectedCallback() {
        counter = 0
    }

    observedattributes() {
        return ['title']
    }
}

export { MuiscContainer }
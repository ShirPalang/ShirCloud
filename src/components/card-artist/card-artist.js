const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" href="src/components/card-artist/card-artist.css">
    <div class="musics-card">
        <div class="cover">
            <img src="" alt="">
        </div>
        <div class="title">
            <h3></h3>
        </div>
        <slot name="artist"></slot>
    </div>`

class CardArtist extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:"open"})
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    connectedCallback(){
        const title = this.shadowRoot.querySelector('h3')
        const cover = this.shadowRoot.querySelector('img')

        cover.src = this.getAttribute('cover')
        title.innerHTML = this.getAttribute('title')
    }

    observedAttributes(){
        return []
    }
}

export { CardArtist }
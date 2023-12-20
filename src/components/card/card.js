const template = document.createElement('template')

template.innerHTML = `
<link rel="stylesheet" href="src/components/card/card.css">
    <div class="card">
        <div class="cover">
            <img src="" alt="">
        </div>
        <div class="details">
            <h2 class="music-title"></h2>
            <slot name="artist"></slot>
        </div>
        <audio src=""></audio>
    </div>
`

class Card extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    connectedCallback(){
        const title = this.shadowRoot.querySelector('.music-title')
        const cover = this.shadowRoot.querySelector('img')
        const audio = this.shadowRoot.querySelector('audio')

        title.innerHTML = this.getAttribute('title')
        cover.src = this.getAttribute('cover')
        audio.src = this.getAttribute('audio')
    }

    observedAttributes(){
        return ['title' , 'cover' , 'audio']
    }
}

export { Card }
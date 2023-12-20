const template = document.createElement('template')

template.innerHTML = `
<link rel="stylesheet" href="src/components/loading/loading.css">
    <div class="ring">Loading
        <span></span>
    </div>`

class Loading extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.append(template.content.cloneNode(true))
    }
}

export { Loading }
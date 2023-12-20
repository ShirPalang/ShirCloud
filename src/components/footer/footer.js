const template = document.createElement('template')

template.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="src/components/footer/footer.css">
    <footer class="footer">
        <div class="footer-content">
            <h1>ShirPalang</h1>
            <h4>Hi, my name is ShirPalang but you can call me SUS, in avalin project mane, faghat khastam ba pure JS ye project bezanam ke khob haselesh shod in project, So support me on Youtube because I want to become rich, Sho Bekheyr</h4>
            <hr>
            <div class="socialmedia">
                <div class="media">
                    <i class="ri-youtube-fill" id="youtube"></i>
                </div>
                <div class="media">
                    <i class="ri-instagram-line" id="instagram"></i>
                </div>
                <div class="media" title="رو این نزن(تورخدا)">
                    <i class="ri-github-fill" id="github"></i>
                </div>
                <div class="media">
                    <i class="ri-telegram-fill" id="telegram"></i>
                </div>
            </div>
        </div>
    </footer>
`

class Footer extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:"open"})
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    connectedCallback(){
        this.shadowRoot.getElementById('youtube').onclick = ()=>{
            location.href = 'https://www.youtube.com/@ShirPalang'
        }
        this.shadowRoot.getElementById('instagram').onclick = ()=>{
            location.href = 'https://www.instagram.com/shirpalang2077/'
        }
        this.shadowRoot.getElementById('github').onclick = ()=>{
            alert('داداش گیتهاب ندارم')
        }
        this.shadowRoot.getElementById('telegram').onclick = ()=>{
            location.href = 'https://t.me/ShirPalang_Tel'
        }
    }
}

export { Footer }
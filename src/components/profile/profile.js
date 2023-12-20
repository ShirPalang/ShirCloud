const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" href="src/components/profile/profile.css">
    <div class="profile-container">
        <div class="information-profile">
            <div class="profile-pic">
                <img src="" alt="">
            </div>
            <div class="artist-titles">
                <h1></h1>
            </div>
        </div>
    </div>`

class Profile extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    connectedCallback(){
        const locationSearch = new URLSearchParams(location.search)
        const locationArtist = locationSearch.get('artist')
        const url = 'http://localhost:3000/artists'

        async function getArtistData(el){
            try{
                const res = await fetch(url)
                const artistData = await res.json()

                let findArtist = artistData.find( artist =>{
                    return artist.name == locationArtist
                })

                const {name , profilePic} = findArtist
                
                el.shadowRoot.querySelector('img').src = profilePic
                el.shadowRoot.querySelector('h1').innerHTML = name

            } catch(err){
                console.log(err);
            }
        }
        getArtistData(this)
    }
}

export { Profile }
import { Profile } from "../components/profile/profile.js";
import { CardArtist } from "../components/card-artist/card-artist.js";
import { fetchData } from "../utils/fetchData.js";

window.customElements.define('artist-profile' , Profile)
window.customElements.define('card-artist' , CardArtist)

const url = 'http://localhost:3000/musics'

async function artist(){
    const container = document.querySelector('.music-container')

    const locationSearch = new URLSearchParams(location.search)
    const locationArtist = locationSearch.get('artist')

    try{
        const musics = await fetchData(url)

        const findMusic = musics.filter(music =>{
            return music.artistName === locationArtist
        })

        findMusic.map(data =>{
            const {title , artistName , audio , cover , id} = data
            
            container.innerHTML += `            
            <card-artist 
            title="${title}" 
            cover="${cover}" 
            audio="${audio}"
            artist="${artistName}"
            id="${id}"
            class="music-card">
            <a href="/artist?artist=${artistName}" class="spa-link" slot="artist">${artistName}</a>
            </card-artist>`
        })
        
    } catch(err){
        console.log(err);
    }
}

export default artist
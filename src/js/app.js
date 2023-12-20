import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import library from './library.js'
import { Navbar } from "../components/navbar-site/Navbar-site.js"
import { Loading } from '../components/loading/loading.js'

import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js'

window.customElements.define('loading-site', Loading)
window.customElements.define('navbar-site', Navbar)

const waveContainer = document.querySelector('.wave-container')
const playAndPauseBtn = document.querySelector('.control-buttons')
const musicCover = document.querySelector('.music-cover')
const musicTitle = document.querySelector('.music-title')
const musicDetails = document.querySelector('.music-details')
const saveBtn = document.querySelector('.save-button')

let wavesurfer
let flag = false
let mainMusic = null
let playlist = []

// waveform handling
waveContainer.style.display = 'none'

document.body.addEventListener('click', e => {
    if (e.target.className == 'music-card') {
        document.getElementById('waveform').innerHTML = ''
        let music = e.target.getAttribute('audio')
        let sucess = false

        const cover = e.target.getAttribute('cover')
        const artist = e.target.getAttribute('artist')
        const title = e.target.getAttribute('title')
        const id = e.target.getAttribute('id')

        try {
            wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: '#4b4b4b',
                progressColor: '#ebebeb',
                url: music,
                height: 'auto',
                barGap: 2,
                barWidth: 2,
                barRadius: 43,
                height: 'auto'
            })

            wavesurfer.on('ready', () => {
                wavesurfer.play()
                flag = true
                playAndPauseBtn.innerHTML = `
                <button>
                    <i class="ri-pause-fill"></i>
                </button>`
            })
            sucess = true

        } catch (err) {
            console.error(err);
        }
        if (sucess) {
            waveContainer.style.display = 'flex'
            musicTitle.innerHTML = `<p class="music-played">${title}</p>
            <a href="/artist?artist=${artist}" class="artist-played spa-link link">${artist}</a>`
            musicCover.innerHTML = `<img src="${cover}">`
        }

        mainMusic = id

        saveBtnHandler()
    }
})

// playlist handling
saveBtn.addEventListener('click', () => {
    const mainPlaylist = getLocalStorage('playlist')

    if (mainPlaylist) {
        playlist.push(...mainPlaylist)
    }

    if (!playlist.includes(mainMusic)) {
        playlist.push(mainMusic)

        saveBtn.innerHTML = `<i class="ri-play-list-line"></i>`
    } else {
        const mainMusicIndex = playlist.findIndex(music => {
            return music === mainMusic
        })

        playlist.splice(mainMusicIndex, 1)

        saveBtn.innerHTML = `<i class="ri-play-list-add-line"></i>`
    }

    setLocalStorage('playlist', playlist)

    playlist = []

    library()
})

playAndPauseBtn.addEventListener('click', playOrPause)

document.body.addEventListener('keydown', e => {
    let currentTime = wavesurfer.getCurrentTime()

    if (e.code == 'Space') {
        e.preventDefault()
        playOrPause()
    } else if (e.code == 'ArrowRight') {
        wavesurfer.setTime(currentTime + 5)
    } else if (e.code == 'ArrowLeft') {
        wavesurfer.setTime(currentTime - 5)
    }
})

musicDetails.addEventListener('click', e => {
    if (!e.target.className.includes('artist-played'))
        waveContainer.classList.add('full-size')
    else
        waveContainer.classList.remove('full-size')
})

document.querySelector('.cancelBtn').addEventListener('click', () => {
    waveContainer.classList.remove('full-size')
})

function playOrPause() {
    if (wavesurfer) {
        if (flag) {
            wavesurfer.pause()
            playAndPauseBtn.innerHTML = `
            <button>
                <i class="ri-play-fill"></i>
            </button>`
        } else {
            wavesurfer.play()
            playAndPauseBtn.innerHTML = `                
            <button>
                <i class="ri-pause-fill"></i>
            </button>`
        }
        flag = !flag
    }
}

function saveBtnHandler() {
    const mainPlaylist = getLocalStorage('playlist')

    if (mainPlaylist.includes(mainMusic)) {
        saveBtn.innerHTML = `<i class="ri-play-list-line"></i>`
    } else {
        saveBtn.innerHTML = `<i class="ri-play-list-add-line"></i>`
    }
}
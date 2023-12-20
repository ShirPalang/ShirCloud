import router from "./router.js";
import home from "./home.js";
import artist from "./artist.js";
import library from "./library.js";

document.addEventListener('click' , e =>{
    e.preventDefault()
    if(!e.target.className.includes('spa-link')){
        return false
    }
    
    urlRoutes(e)

    locationHandler()
})

function urlRoutes(e){
    window.history.pushState({} , '' , e.target.href)
}

let loc

async function locationHandler(){
    loc = window.location.pathname

    const route = router[loc] || router[404];

    const html = await fetch(route.template).then(res => res.text())
    document.getElementById('content').innerHTML = html
    document.title = route.title

    if(loc == '/'){
        home()
    } else if(loc == '/artist') {
        artist()
    } else if(loc == '/library') {
        library()
    }
}

window.onpopstate = ()=> {
    locationHandler()
}

window.onload = ()=> {
    document.querySelector('loading-site').style.display = 'none'
    document.getElementById('website').style.display = 'block'
    locationHandler()
}
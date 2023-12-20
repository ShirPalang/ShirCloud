const title = 'ShirCloud'

const router = {
    404: {
        template: 'src/pages/404.html',
        title: `${title} | 404`
    } ,
    '/' : {
        template: 'src/pages/home.html',
        title: `${title} | Home`
    } , 
    '/artist' : {
        template: 'src/pages/artist.html',
        title: `${title} | Artist`
    } ,
    '/library' : {
        template: 'src/pages/library.html',
        title: `${title} | Library`
    } ,
    '/explore' : {
        template: 'src/pages/explore.html',
        title: `${title} | باور کن نمیدونم`
    } 
}

export default router
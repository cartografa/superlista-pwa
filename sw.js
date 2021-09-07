self.addEventListener('install', e => {
    console.log('sw installed')
})

self.addEventListener('activate', e => {
    console.log('sw activated')
})

self.addEventListener('fetch', e => {
    // console.log('sw fetch!')
    if (0) { // para operación de prueba de SW

        let { url: url, method: method } = e.request

        console.log(method, url)
        console.warn(`Es un CSS? ${url.includes('.css') ? 'SÍ' : 'NO'}`)
        console.log('')

        if (0) {
            if (url.includes('style.css')) {
                // let response = null
                let response = new Response(`
                    * {
                    box-sizing: border-box;
                    }
                    
                    .w-10 { width: 10%; }
                    .w-20 { width: 20%; }
                    .w-30 { width: 30%; }
                    .w-40 { width: 40%; }
                    .w-50 { width: 50%; }
                    .w-60 { width: 60%; }
                    .w-70 { width: 70%; }
                    .w-80 { width: 80%; }
                    .w-90 { width: 90%; }
                    .w-100 { width: 100%; }
                    
                    .ml-item {
                        margin-left: 1.2rem;
                    }
                    
                    .mdl-layout {
                        min-width: 320px;
                    }
                    
                    .contenedor {
                        padding: 1.3rem;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                    
                    .hero--img {
                        width: 100%;
                        max-width: 1800px;
                    }
                    
                    .mdl-dialog__title {
                        font-size: 1.8rem;
                    }
                `, { headers: {'content-type': 'text/css'} } )

                e.respondWith(response)
            }
            else if (url.includes('material.light_green-deep_orange.min')) {
                let response = fetch('https://code.getmdl.io/1.3.0/material.light_green-deep_orange.min.css')
                e.respondWith(response)
            }
            else if (url.includes('groceries.jpg')) {
                let response = fetch('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/07/ocarina-of-time-1.jpg',
                { mode: 'no-cors' })
                .catch(error => console.error('Error en fetch imagen', error))
                e.respondWith(response)
            }
            else if (url.includes('main.js')) {
                console.warn('PETICIÓN MAIN INTERCEPTADA')

                let respuesta = fetch('./js/main.js')
                e.respondWith(respuesta)
            }
        }
        else {
            let response = fetch(url)
            e.respondWith(response)
        }
    }
})
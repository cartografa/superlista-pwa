const apiProd = (function() {

    /* ------ SERVICIO API REST con mockapi.io ----------*/
    function getURL(id) {
        return 'https://6132b692ab7b1e001799b5a6.mockapi.io/lista' + (id || '')
    }

    /* GET */
    async function get() {
        try { 
            let prods = await $.ajax( { url: getURL() } )
            return prods
        }
        catch (error) {
            console.error('Error get', error)
            return []
        }
    } 

    /* POST */
    async function post(prod) {
        try { 
            return await $.ajax({ 
                url: getURL(),
                method: 'post',
                data: prod 
            })
        }
        catch (error) {
            console.error('Error post', error)
            return {}
        }
    } 

    /* PUT */
    async function put (prod, id) {
        try {
            return await $.ajax({
                url: getURL(id),
                method: 'put',
                data: prod
            })
        }
        catch (error) {
            console.error('Error put', error)
            return {}
        }
    }

  
    /* DELETE ALL */
    async function deleteAll() {
        const progress = document.querySelector('progress')
        progress.style.display = 'block'

        let porcentaje = 0;

        for (let i = 0; i < listaProductos.length; i++) {

            // calcula porcentaje de borrado:
            porcentaje = parseInt( (i*100) / listaProductos.length )
            console.log(porcentaje)

            // paso el porcentaje a la barra de progreso
            progress.value = porcentaje

            let id = listaProductos[i].id
            try {
                await del(id)
            }
            catch (error) {
                console.error('Error delete all en ID:', id, error)
            }
        }
        porcentaje = 100
        console.log (porcentaje)

        progress.value = porcentaje 

        setTimeout(() => {
            progress.style.display = 'none'
        }, 2000)
    }


    /* DELETE */
      async function del(id) {
        try {
            return await $.ajax({
                url: getURL(id), 
                method: 'delete'
                })
        }
        catch (error) {
            console.error('Error delete', error)
            return {}
        }
    }

    console.warn('Librería apiProd instalada')

    /* PUBLICACIÓN */
    return {
        get: () => get(),
        post: prod => post(prod),
        put: (prod, id) => put(prod, id),
        del: id => del(id),
        deleteAll: () => deleteAll()
    }

})()
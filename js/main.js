/*-------------------------------------------------*/
/*               VARIABLES GLOBALES                */
/*-------------------------------------------------*/

let listaProductos = [
    // { nombre: 'Aceite de Oliva', cantidad: 1, precio: 280.00 },
    // { nombre: 'Fideos', cantidad: 2, precio: 95.00 },
    // { nombre: 'Tomates secos', cantidad: 50, precio: 120.00 }
]

let crearLista = true
let ul

/*------------------------------------------------*/
/*                FUNCIONES GLOBALES              */
/*------------------------------------------------*/

async function borrarProd(id) {

    console.log('borrarProd', id)

    try {
        await apiProd.del(id)
        renderLista()
    }
    catch(error) {
        console.error('Error en el borrado del producto con id:', id)
    }
}

// function cambiarCantidad(index, el) {
//     let cantidad = parseInt(el.value)
//     console.log('cambiarCantidad', el)
//     // console.dir(el)
//     listaProductos[index].cantidad = cantidad
// }

// function cambiarPrecio(index, el) {
//     let precio = parseFloat(el.value)
//     console.log('cambiarPrecio', el)
//     listaProductos[index].precio = precio
// }

async function cambiarValor(tipo, id, el) {
    let valor = el.value
    valor = tipo == 'precio' ? Number(valor) : parseInt(valor)

    // calculo el index al producto desde su id
    let index = listaProductos.findIndex(prod => prod.id == id)

    console.log('cambiarValor', tipo, id, valor)

    listaProductos[index][tipo] = valor

    // actualizo producto en el backend
    let prod = listaProductos[index]
    try {
        await apiProd.put(prod, id)
    }
    catch (error) {
        console.error(`Error en actualización de ${tipo} del producto, ${error}`)
    }
}

async function renderLista() {

    try {
        // Leer la plantilla handlebars desde un archivo externo:

        // con fetch ---->
        // let datos = await fetch('./plantilla-lista.hbs')
        // let plantilla = await datos.text()

        // con ajax de jquery ---->
        let plantilla = await $.ajax({ url: './plantilla-lista.hbs' })

        // compilo la plantilla
        let template = Handlebars.compile(plantilla)

        // obtengo la lista productos de la api
        listaProductos = await apiProd.get()

        // ejecuto la plantilla compilada y la agrego a l
        $('#lista').html( template ( { listaProductos: listaProductos } ) )

        let ul = $('#contenedor-lista')
        componentHandler.upgradeElements(ul)
    }
    catch (error) {
        console.error('Error en Handlebars', error)
    }
}

function configurarListeners() {
    // Ingreso de un producto nuevo
    $('#btn-entrada-producto').click( async () => {
        console.log('btn-entrada-producto')

        let input = $('#ingreso-producto')
        let nombre = input.val()
        console.log(nombre)

        if (nombre) {
            try {
                // listaProductos.push({
                //     nombre: producto,
                //     cantidad: 1,
                //     precio: 0
                // })
                let producto = { 
                    nombre: nombre, 
                    cantidad: 1, 
                    precio: 0
                }
                await apiProd.post(producto)
                renderLista()
                input.val(null)
            }
            catch (error) {
                console.error('Error en la entrada del producto', error)
            }
        }
    })

    // Borrado total de productos
    $('#btn-borrar-productos').click( () => {
        console.log('btn-borrar-productos')

        if(listaProductos.length) {
            let dialog = $('dialog')[0];
            dialog.showModal();
        }
        
    })
}

function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        // window.addEventListener('load', () => {
            this.navigator.serviceWorker.register('./sw.js') //devuelve una promesa
            .then (reg => {
                // console.log('El SW se registró correctamente: ', reg)
            })
            .catch (err => {
                console.error('Error al registrar el SW', err)
            })
        // })
    } 
    else {
        console.error('serviceWorker no está disponible en navigator')
    }
}

function initDialog() {
    let dialog = $('dialog')[0];
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    $('dialog .close').click( () => {
        dialog.close();
    });

    $('dialog .aceptar').click( () => {
        listaProductos = []
        renderLista()

        dialog.close();
    });
}

function testCache() {

}

function start() {
    // console.log(document.querySelector('title').textContent)
    // console.log($('title').text())
    registrarServiceWorker()
    configurarListeners()
    initDialog()
    renderLista()
    testCache()
}


/*------------------------------------*/
/*            EJECUCIÓN               */
/*------------------------------------*/

// window.onload = start
$(document).ready(start)

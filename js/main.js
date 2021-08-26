/*-------------------------------------------------*/
/*               VARIABLES GLOBALES                */
/*-------------------------------------------------*/

let listaProductos = [
    { nombre: 'Aceite de Oliva', cantidad: 1, precio: 280.00 },
    { nombre: 'Fideos', cantidad: 2, precio: 95.00 },
    { nombre: 'Tomates secos', cantidad: 50, precio: 120.00 }
]


let crearLista = true
let ul

/*------------------------------------------------*/
/*                FUNCIONES GLOBALES              */
/*------------------------------------------------*/

function borrarProd(index) {
    console.log('borrarProd', index)

    listaProductos.splice(index, 1)
    renderLista()
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

function cambiarValor(tipo, index, el) {
    let valor = el.value
    valor = tipo == 'precio' ? Number(valor) : parseInt(valor)

    console.log('cambiarValor', tipo, index, valor)
    listaProductos[index][tipo] = valor
}

function renderLista() {

    if (crearLista) {
        ul = document.createElement('ul');
        // <ul class="demo-list-icon mdl-list w-100"></ul>
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100');
    }

    ul.innerHTML = ''

    listaProductos.forEach((prod, index) => {
        console.log(index, prod)
        ul.innerHTML +=
            `
            <li class="mdl-list__item">

                <!-- Ícono del producto -->
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                </span>

                <!-- Nombre del producto -->
                <span class="mdl-list__item-primary-content w-30">
                    ${prod.nombre}
                </span>

                <!-- Cantidad del producto -->
                <span class="mdl-list__item-primary-content w-20">
                    <!-- Textfield with Floating Label -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarValor('cantidad', ${index}, this)" value="${prod.cantidad}" class="mdl-textfield__input" type="text" id="cantidad-${index}">
                        <label class="mdl-textfield__label" for="cantidad-${index}">Cantidad</label>
                    </div>
                </span>

                <!-- Precio del producto -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarValor('precio', ${index}, this) value="${prod.precio}" class="mdl-textfield__input" type="text" id="precio-${index}">
                        <label class="mdl-textfield__label" for="precio-${index}">Precio($)</label>
                    </div>
                </span>

                <!-- Acción (eliminar) -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Colored FAB button with ripple -->
                    <button onclick="borrarProd(${index})"
                        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                        <i class="material-icons">remove_shopping_cart</i>
                    </button>
                </span>

            </li>
            `
    })

    if (crearLista) {
        document.getElementById('lista').appendChild(ul)
    }
    else {
        componentHandler.upgradeElements(ul)
    }

    crearLista = false
}

function configurarListeners() {
    // Ingreso de un producto nuevo
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value
        console.log(producto)

        if (producto) {
            listaProductos.push({
                nombre: producto,
                cantidad: 1,
                precio: 0
            })
            renderLista()
            input.value = null
        }
    })

    // Borrado total de productos
    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        console.log('btn-borrar-productos')

        if (confirm('¿Desea borrar todos los productos?')) {
            listaProductos = []
            renderLista()
        }
    })
}

function start() {
    console.log(document.querySelector('title').textContent)

    configurarListeners()
    renderLista()
}


/*------------------------------------*/
/*            EJECUCIÓN               */
/*------------------------------------*/
window.onload = start


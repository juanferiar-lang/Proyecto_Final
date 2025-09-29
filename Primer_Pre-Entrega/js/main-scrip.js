// CONSTANTES
const nombre_restaurante = "El Mexican"
const menu = [
    { nombre: "tacos", precio: 20000 },
    { nombre: "quesadillas", precio: 18000 },
    { nombre: "burritos", precio: 20000 },
    { nombre: "enchiladas", precio: 25000 }
]

// VARIABLES
let pedido = []
let totalPagar = 0

// FUNCIONES
function agregarProducto(producto) {
    pedido.push(producto)
    totalPagar += producto.precio
    alert("Has agregado " + producto.nombre + " a tu pedido. Total actual: $" + totalPagar)
    console.log("Producto agregado: " + producto.nombre)
}

function eliminarProducto(nombre) {
    const index = pedido.findIndex(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    if (index !== -1) {
        const productoEliminado = pedido.splice(index, 1)[0]
        totalPagar -= productoEliminado.precio
        return true
    }
    return false
}

function manejarConfirmacion(pedido, total) {
    if (pedido.length > 0) {
        let confirmacion = confirm(
            "Tu pedido es: " + pedido.map(p => p.nombre).join(", ") + "\n" +
            "El total a pagar es: $" + total + "\n" +
            "¿Deseas confirmar tu compra?"
        )
        if (confirmacion) {
            alert("Gracias por tu compra. Tu pedido está en camino.")
            console.log("Pedido finalizado con éxito.")
        } else {
            alert("Compra cancelada. Esperamos verte pronto")
            console.log("Compra cancelada.")
        }
    } else {
        alert("No se realizó ningún pedido. ¡Hasta la próxima!")
    }
}

function mostrarPedidoActual(pedido, total) {
    if (pedido.length > 0) {
        alert("Tu pedido es: " + pedido.map(p => p.nombre).join(", ") + "\n" +
            "El total a pagar es: $" + total + "\n")
    } else {
        alert("No se realizó ningún pedido hasta el momento")
    }
}

function eliminar(){
    if (pedido.length > 0) {
        const productoAeliminar = prompt("¿Qué producto deseas eliminar? " + "( " + pedido.map(p => p.nombre).join(", ") + " ) ")
        let validacion_eliminar = eliminarProducto(productoAeliminar)
        if (validacion_eliminar) {
            alert("Has eliminado " + productoAeliminar + ". Total actual: $" + totalPagar)
            console.log("Producto eliminado: " + productoAeliminar)
        } else {
            alert(productoAeliminar + " no se encontró en tu pedido.")
        }
    } else {
        alert("No hay ningún producto en el pedido hasta el momento")
    }
}

function agregar(opcion) {
    if (opcion > 0 && opcion <= menu.length) {
        agregarProducto(menu[opcion - 1])
    } else {
        alert("Opción no válida. Por favor, elige un número del menú.")
    }
}

function mostrarMenu(){
    let menuTexto = "Bienvenido a " + nombre_restaurante + "\n\nMenú del Día:\n"
    let contador = 1
    for(let producto of menu){
        menuTexto += contador +". " + producto.nombre + " ( $" + producto.precio+ " )\n"
        contador++
    }
    menuTexto += "\nEscribe un número del menú o " + "\n" +
        "'eliminar' para quitar un producto " + "\n" +
        "'pedido' para ver tu pedido" + "\n" +
        "'salir' para terminar: "
    return menuTexto
}
// ----- --------------------------- Codigo principal ---------------------------- //
let continuar = true
do {
    const panelMenu = mostrarMenu()
    let eleccion = prompt(panelMenu)
    switch (eleccion.toLowerCase()) {
        case "salir":
            continuar = false
            break
        case "eliminar":
            eliminar()
            break
        case "pedido":
            mostrarPedidoActual(pedido, totalPagar)
            break
        default:
            let opcion = parseInt(eleccion)
            agregar(opcion)
            break
    }
} while (continuar)

manejarConfirmacion(pedido, totalPagar)
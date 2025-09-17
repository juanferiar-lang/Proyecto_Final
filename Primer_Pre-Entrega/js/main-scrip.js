const nombre_restaurante = "El Mexican"
const nombres_menu = ["tacos", "quesadillas", "burritos", "enchiladas"]
const precios_menu = [20000, 18000, 20000, 25000]

let pedido_nombres = []
let pedido_precios = []
let totalPagar = 0

function agregarProducto(nombre, precio) {
    pedido_nombres.push(nombre)
    pedido_precios.push(precio)
    totalPagar += precio
    alert("Has agregado " + nombre+ " a tu pedido. Total actual: $" + totalPagar)
    console.log("Producto agregado: "+ nombre)
}

function eliminarProducto(nombre){
    const producto = nombre.toLowerCase()
    const index_producto = pedido_nombres.indexOf(producto)
    const productoEliminado = pedido_nombres.find(pedido => pedido === producto)
    if (productoEliminado){
        pedido_nombres.splice(index_producto,1)
        const precio_eliminado = pedido_precios.splice(index_producto,1)[0]
        totalPagar -= precio_eliminado
        return true
    } 
    return false
}

function manejarConfirmacion(arrayPedido, total) {
    if (arrayPedido.length > 0) {
        let confirmacion = confirm(
            "Tu pedido es: " + arrayPedido.join(", ") + "\n" +
            "El total a pagar es: $" + total + "\n" +
            "¿Deseas confirmar tu compra?"
        )
        if (confirmacion) {
            alert("Gracias por tu compra. Tu pedido está en camino. ")
            console.log("Pedido finalizado con éxito.")
        } else {
            alert("Compra cancelada. Esperamos verte pronto")
            console.log("Compra cancelada.")
        }
    } else {
        alert("No se realizó ningún pedido. ¡Hasta la próxima!")
    }
}

function mostrarPedidoActual(arrayPedido_nombres, total) {
    if (arrayPedido_nombres.length > 0) {
        alert("Tu pedido es: " + pedido_nombres.join(", ") + "\n" +
        "El total a pagar es: $" + total + "\n" )
    } else {
        alert("No se realizó ningún pedido hasta el momento")
    }
}

// ----- Main Code  -----
let continuar = true
do {
    let menuTexto = "Bienvenido a " + nombre_restaurante+ "\n\nMenú del Día:\n" 
    for (let i = 0; i < nombres_menu.length; i++) {
        menuTexto += (i + 1) + " " + nombres_menu[i] + "( " + precios_menu[i] +" )\n"      
    }
    menuTexto += "\nEscribe un número del menu o " + "\n" +
                 "'eliminar' para quitar un producto " + "\n" +
                 "'pedido' para ver tu pedido" + "\n" +
                 "'salir' para terminar: "
    
    let eleccion = prompt(menuTexto);
    switch(eleccion.toLowerCase()){
        case "salir":
            continuar = false
            break
        case "eliminar":
            const productoAeliminar = prompt("¿Qué producto deseas eliminar? "+ pedido_nombres.join(", "))
            let validacion_eliminar = eliminarProducto(productoAeliminar.toLowerCase());
            if (validacion_eliminar) {
                alert("Has eliminado " + productoAeliminar + ". Total actual: $" + totalPagar)
                console.log("Producto eliminado: " + productoAeliminar)
            } else {
                alert(productoAeliminar + " no se encontró en tu pedido.")
            }
            break
        case "pedido":
            mostrarPedidoActual(pedido_nombres, totalPagar)
            break
        default:
            let opcion = parseInt(eleccion)
            if (opcion > 0 && opcion <= nombres_menu.length) {
                agregarProducto(nombres_menu[opcion - 1], precios_menu[opcion - 1])
            } else {
                alert("Opción no válida. Por favor, elige un número del menú.")
            }
            break
    }
} while (continuar)

manejarConfirmacion(pedido_nombres, totalPagar)
// CONSTANTES
const nombre_restaurante = "El Mexican"
class producto{
    static id = 0
    constructor (nombre, precio){
        this.id = ++producto.id
        this.nombre = nombre
        this.precio = precio
    }
}
const menu = [
    new producto ("tacos", 20000),
    new producto ("quesadillas", 18000),
    new producto ("burritos", 20000),
    new producto ("enchiladas", 25000)
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
    const producto = menu.find(p => p.id === opcion)
    if (producto){
        agregarProducto(producto)
    } else {
        alert("Opción no válida. Por favor, elige un número del menú.")
    }
}

function mostrarMenu(){
    let menuTexto = "Bienvenido a " + nombre_restaurante + "\n\nMenú del Día:\n"
    for(let producto of menu){
        menuTexto += producto.id + ". " + producto.nombre + " ( $" + producto.precio+ " )\n"
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
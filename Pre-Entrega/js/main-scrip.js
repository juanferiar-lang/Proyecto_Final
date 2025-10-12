// CONSTANTES
const nombre_restaurante = "El canton de Tijuana"
class producto{
    static id = 0
    constructor (nombre, precio, descripcion, imagen, cantidad){
        this.id = ++producto.id
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.imagen = imagen
        this.cantidad = cantidad
    }
}
const menu = [
    new producto (
        "tacos", 
        20000, 
        "Cuatro tortillas de maíz rellenas de frijol refrito y cubiertas con ingredientes frescos.",
        "/Pre-Entrega/imagenes/tacos.jpg",
        0
        ),
    new producto (
        "quesadillas", 
        18000,
        "Tortillas de maíz o harina dobladas y rellenas con abundante queso fundido.",
        "/Pre-Entrega/imagenes/quesadillas.jpg",
        0
        ),
    new producto (
        "burritos", 
        20000,
        "Gran tortilla de harina rellena con una combinación de arroz, frijoles y carne.",
        "/Pre-Entrega/imagenes/burritos.jpg" ,
        0
        ),
    new producto (
        "enchiladas", 
        25000,
        "Tortillas de maíz bañadas en una salsa de chile (roja o verde), rellenas de pollo o queso, " + 
        "y horneadas. Se sirven con crema, queso rallado y cebolla.",
        "/Pre-Entrega/imagenes/enchiladas.jpg",
        0
        ) 
]


// FUNCIONES

let seccion_productos = document.getElementById("seccion_productos")
let pedido = JSON.parse(localStorage.getItem("pedido")) || []

function visualizacionProductos(arrayProductos){
    arrayProductos.forEach(producto => {
        const card = document.createElement('div')
        card.classList.add('card-producto')
        card.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                          <h3 class='nombreproductos'>${producto.nombre}</h3>
                          <h2>${producto.precio}</h2>
                          <p class="descripcion">${producto.descripcion}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>
                          `
        seccion_productos.appendChild(card)
    })
    añadircardboton()
}

function añadircardboton() {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (event) => {
            const productId = event.currentTarget.id     
            const productoExistente = pedido.some(p => p.id === parseInt(productId));
            if (productoExistente) {
                const selectedProduct = pedido.find(producto => producto.id == parseInt(productId))
                selectedProduct.cantidad = (selectedProduct.cantidad || 1) + 1
            } else {
                const selectedProduct = menu.find(producto => producto.id == parseInt(productId))
                selectedProduct.cantidad = 1
                pedido.push(selectedProduct)
            }
            actualizarContadorCarrito()
            localStorage.setItem("pedido", JSON.stringify(pedido));
        }
    })
}

function actualizarContadorCarrito() {
    const totalProductosCarritos = pedido.length
    const contadorelementos = document.getElementById("contador-carrito")
    contadorelementos.innerText = totalProductosCarritos
}

visualizacionProductos(menu)
actualizarContadorCarrito();

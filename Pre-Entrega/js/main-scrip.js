// CONSTANTES
const nombre_restaurante = "El canton de Tijuana"
const URL = '../db/data.json'
/*  
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
        "../imagenes/tacos.jpg",
        0
        ),
    new producto (
        "quesadillas", 
        18000,
        "Tortillas de maíz o harina dobladas y rellenas con abundante queso fundido.",
        "../imagenes/quesadillas.jpg",
        0
        ),
    new producto (
        "burritos", 
        20000,
        "Gran tortilla de harina rellena con una combinación de arroz, frijoles y carne.",
        "../imagenes/burritos.jpg" ,
        0
        ),
    new producto (
        "enchiladas", 
        25000,
        "Tortillas de maíz bañadas en una salsa de chile (roja o verde), rellenas de pollo o queso, " + 
        "y horneadas. Se sirven con crema, queso rallado y cebolla.",
        "../imagenes/enchiladas.jpg",
        0,
    new producto (
        "nachos", 
        10000, 
        "Bandeja de Nachos con dos salsas al gusto.",
        "../imagenes/tacos.jpg",
        0
        ),
    new producto (
        "helado", 
        8000, 
        "Copa de helado con una salsa de su gusto",
        "../imagenes/tacos.jpg",
        0
        ),
        ) 
]*/

// FUNCIONES SWEET ALERT
function productoAgregado() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado",
        showConfirmButton: false,
        timer: 1500
      });
}


// FUNCIONES

let seccion_productos = document.getElementById("seccion_productos")
let pedido = JSON.parse(localStorage.getItem("pedido")) || []

function visualizacionProductos(arrayProductos){
    arrayProductos.forEach(producto => {
        const card = document.createElement('div')
        card.classList.add('card-producto')
        card.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto" loading="lazy">
                          <h3 class='nombreproductos'>${producto.nombre}</h3>
                          <h2>${producto.precio}</h2>
                          <p class="descripcion">${producto.descripcion}</p>             
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>
                          `
        seccion_productos.appendChild(card)
    })
    añadircardboton(arrayProductos)
}

function añadircardboton(menu) {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (event) => {
            const productId = event.currentTarget.id     
            const productoExistente = pedido.some(p => p.id === parseInt(productId));
            if (productoExistente) {
                const selectedProduct = pedido.find(producto => producto.id == parseInt(productId))
                selectedProduct.cantidad = (selectedProduct.cantidad || 1) + 1
                productoAgregado()
            } else {
                const selectedProduct = menu.find(producto => producto.id == parseInt(productId))
                selectedProduct.cantidad = 1
                pedido.push(selectedProduct)
                productoAgregado()
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
    Toastify({
        text: 'Carrito anctualizado',
        duration: 1500,
        gravity: 'bottom',
        position: 'right',
        backgroundColor: 'green'

    }).showToast()
}

function obtenerProductos(){
    fetch(URL)
        .then(response => response.json())
        .then(data =>{
            visualizacionProductos(data)
            actualizarContadorCarrito();
        })
        .catch(error => console.log('Hubo un error', error))
        .finally(()=> console.log('finalizada la peticion'))
}

obtenerProductos()

let pedidoStorage = localStorage.getItem("pedido")
pedidoStorage = JSON.parse(pedidoStorage) || []
let cardContainer = document.getElementById("card-section")
let totalContainer = document.getElementById("total-section")
function renderpedido(cardItems) {
    cardContainer.innerHTML = ""
    if (cardItems.length === 0) {
        cardContainer.innerHTML = '<p>Tu carrito está vacío. <a href="index.html">Agrega productos</a>.</p>'
        totalContainer.innerHTML = ""
        return
    }
    cardItems.forEach(producto => {
        const card = document.createElement("div")
        card.classList.add('.card-producto-carrito')
        const subtotal = producto.precio * producto.cantidad
        const cantidadActual = producto.cantidad;
        card.innerHTML = `
                          <img src="${producto.imagen }" alt="${producto.nombre}" class="imagen-producto-carrito">
                          <h3 class='nombreproductos'>${producto.nombre}</h3>
                          <div class="controles-cantidad">
                            <button class="btn-resta" id="restar-${producto.id}">-</button>
                            <span class="cantidad">Cantidad: ${cantidadActual}</span>
                            <button class="btn-suma" id="sumar-${producto.id}">+</button>
                          </div>
                          <div class="info-precios">
                            <p class="precio-unitario">Precio unitario: $${producto.precio}</p>
                            <p class="subtotal">Subtotal: $${subtotal}</p>
                          </div>
                          <button class="btn-eliminar" id="eliminar-${producto.id}">Eliminar del carrito</button>
                         `
        cardContainer.appendChild(card)
    })
    sumboton()
    restboton()
    eliminarboton()
    const total = calcularTotal(pedidoStorage)
    rendertotal(total)
}

function  sumboton(){
    const sumButton = document.querySelectorAll(".btn-suma")
    sumButton.forEach(button => {
        button.onclick = (event) => {
            const buttonId = event.currentTarget.id;  
            const productId = parseInt(buttonId.split('-')[1]); 
            const selectedProduct = pedidoStorage.find(producto => producto.id == productId)
            selectedProduct.cantidad++
            actualizarCarritoYTotal()
        }
    })
}


function  restboton(){
    const restbutton = document.querySelectorAll(".btn-resta")
    restbutton.forEach(button => {
        button.onclick = (event) => {
            const buttonId = event.currentTarget.id 
            const productId = parseInt(buttonId.split('-')[1])
            const selectedProduct = pedidoStorage.find(producto => producto.id == productId)
            if (selectedProduct.cantidad > 1) {
                selectedProduct.cantidad--
                actualizarCarritoYTotal()           
            }else{
                button.disabled = true
            }
        }
    })
}

function  eliminarboton(){
    const deletebutton = document.querySelectorAll(".btn-eliminar")
    deletebutton.forEach(button => {
        button.onclick = (event) => {
            const buttonId = event.currentTarget.id
            const productId = parseInt(buttonId.split('-')[1]); 
            const productoIndex = pedidoStorage.findIndex(producto => producto.id == productId)         
            if (productoIndex !== -1) {
                pedidoStorage.splice(productoIndex, 1)
                actualizarCarritoYTotal()
            }
        }
    })
}
function calcularTotal(pedido) {
    return pedido.reduce((acum, producto) => acum + (producto.precio * producto.cantidad), 0)
}

function rendertotal(totalPagar) {
    totalContainer.innerHTML = ""
    const cardTotal = document.createElement("div")
    cardTotal.innerHTML = `<h3>Total a Pagar: ${totalPagar}</h3>`
    totalContainer.appendChild(cardTotal)
}

function actualizarCarritoYTotal() {
    localStorage.setItem("pedido", JSON.stringify(pedidoStorage))
    renderpedido(pedidoStorage) 
}

renderpedido(pedidoStorage)


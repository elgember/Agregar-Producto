let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
    //verificar si el producto ya está en el carrito
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        //si el producto ya está en el carrito, aumentar la cantidad
        producto.cantidad += 1;
    } else {
        //si el producto no está en el carrito, agregarlo con cantidad 1
        carrito.push({ id, nombre, precio, cantidad: 1});
    }
    //actualizar la vista del carrito
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    //eliminar el producto del carrito
    carrito = carrito.filter(item => item.id !== id);
    renderizarCarrito();
}

// funcion para renderizar el carrito en la vista en html 
function renderizarCarrito() {
    const carritoContainer = document.getElementById('lista__carrito');
    const totalContainer = document.getElementById('total__carrito');

    //limpiar el contenedor del carrito
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
        totalContainer.innerText = 'Total: $0';
        return;
    }

    let totalAcumulado = 0;

    //recorrer el carrito y crear elementos para cada producto
    carrito.forEach(item => {
        const subTotal = item.precio * item.cantidad;
        totalAcumulado += subTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('carrito__item');

        itemElement.innerHTML = `
            <span>${item.nombre} (x${item.cantidad}) - $${subTotal}</span>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>`;

        carritoContainer.appendChild(itemElement);
    })
    //actualizar el total acumulado en la vista
    totalContainer.innerText = `Total: $${totalAcumulado}`
}

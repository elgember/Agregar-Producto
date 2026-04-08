let carrito = [];

const descuento = 'verano';
const porcentaje = 0.20;

function agregarAlCarrito(id, nombre, precio, categoria) {
    //verificar si el producto ya está en el carrito
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        //si el producto ya está en el carrito, aumentar la cantidad
        producto.cantidad += 1;
    } else {
        //si el producto no está en el carrito, agregarlo con cantidad 1
        carrito.push({ id: id,
            nombre: nombre,
            precio: precio,
            categoria: categoria,
            cantidad: 1 });
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
    const descuento20 = document.getElementById('descuento__20');

    //limpiar el contenedor del carrito
    carritoContainer.innerHTML = '';
    descuento20.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
        totalContainer.innerText = 'Total: $0.00';
        return;
    }

    let totalApagar = 0;
    let totalAhorro = 0;

    //recorrer el carrito y crear elementos para cada producto
    carrito.forEach(item => {
        let subTotal = item.precio * item.cantidad;
        let descuentoItem = 0;
        let tieneDecuento = false;

        if (item.categoria === descuento) {
            descuentoItem = subTotal * porcentaje;
            tieneDecuento = true;
        }

        let subTotalFinal = subTotal - descuentoItem;
        totalApagar += subTotalFinal;
        totalAhorro += descuentoItem;

        const itemElement = document.createElement('div');
        itemElement.classList.add('carrito__item');

        const etiquetaDescuento = tieneDecuento ? '<span class="etiqueta__ofeta">-20%</span>' : '';

        itemElement.innerHTML = `
            <span>${item.nombre} ${etiquetaDescuento} (x${item.cantidad}) - $${subTotal.toFixed(2)}</span>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>`;

        carritoContainer.appendChild(itemElement);
    })

    if (totalAhorro > 0) {
        descuento20.innerText = `¡Ahorraste ${totalAhorro.toFixed(2)} en tu compra`;
    }

    //actualizar el total acumulado en la vista
    totalContainer.innerText = `Total: $${totalApagar.toFixed(2)}`
}

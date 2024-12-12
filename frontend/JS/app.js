class MenuEntradas {
    constructor(id, name, precio, stock) {
        this.id = id;
        this.name = name;
        this.precio = precio;
        this.stock = stock;
    }
}

const menuEntradas = [
    new MenuEntradas(1, "Duki", 40, 4),
    new MenuEntradas(2, "Callejeros", 15, 8),
    new MenuEntradas(3, "Margarita", 15, 15),
    new MenuEntradas(4, "Taylor Swift", 70, 4),
    new MenuEntradas(5, "AC/DC", 70, 4),
    new MenuEntradas(6, "Callejero Fino", 20, 4),
    new MenuEntradas(7, "A toda Maquina", 15, 6),
];

function createCard(menuEntradas = '') {
    let contenedor = document.getElementById("contenedor");
    contenedor.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-4", "p-4");

    menuEntradas.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("bg-white", "rounded-lg", "shadow-md", "p-6", "w-full");
        card.innerHTML = `
            <h2 class="text-xl font-bold mb-2 text-gray-800">${item.name}</h2>
            <p class="text-green-600 text-lg font-semibold mb-2">$${item.precio}</p>
            <p class="text-gray-600">Stock: ${item.stock}</p>
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  
                onclick="entradasCompra(${item.id})">
                Comprar
            </button>
        `;
        contenedor.appendChild(card);
    });
}

createCard(menuEntradas);

function showMenu() {
    alert("Proximos conciertos: ");
    menuEntradas.forEach(item => {
        alert(` ID: [${item.id}] | ${item.name} | ($${item.precio}) | Stock: ${item.stock}`);
    });
}

function messageStockInvalid(productName = '') {
    let message = document.createElement("div");
    message.classList.add("bg-red-500", "text-white", "p-4", "rounded-md", "fixed", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "z-50");
    message.innerHTML = `Lo sentimos, no tenemos suficiente stock de ${productName}.`;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function cantidadEntradaCompra(entradaCantidad = '') {
    let contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.textContent = entradaCantidad;
}

function entradasCompra(productId) {
    let producto = menuEntradas.find(item => item.id === productId);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }
    
    if (producto.stock > 0) {
        producto.stock -= 1;
        let ordenTotal = producto.precio;
        almacenarDato('ultimoProducto', producto);
        mostrarResultado(`Has comprado 1 entrada para ${producto.name} por $${ordenTotal}.`);
        actualizarStockCard(productId, producto.stock);
    } else {
        messageStockInvalid(producto.name);
    }
}

function actualizarStockCard(productId, nuevoStock) {
    const cards = document.querySelectorAll("#contenedor div");
    cards.forEach(card => {
        if (card.innerHTML.includes(`onclick="entradasCompra(${productId})"`)) {
            const stockElement = card.querySelector("p:nth-of-type(2)");
            stockElement.textContent = `Stock: ${nuevoStock}`;
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    crearElementosBase();
    cargarDatosPrevios();
});

function crearElementosBase() {
    const app = document.getElementById('app');
    const contenedor = document.createElement('div');
    contenedor.id = 'contenedor';
    app.appendChild(contenedor);

    const salida = document.createElement('div');
    salida.id = 'salida';
    salida.textContent = 'Aquí se mostrarán los resultados.';
    app.appendChild(salida);
}

function mostrarResultado(resultado) {
    const salida = document.getElementById('salida');
    salida.textContent = resultado;
}

function almacenarDato(clave, valor) {
    try {
        const valorJSON = JSON.stringify(valor);
        localStorage.setItem(clave, valorJSON);
        notificar('Datos almacenados con éxito.', 'exito');
    } catch (error) {
        notificar('Error al almacenar los datos.', 'error');
    }
}

function cargarDatosPrevios() {
    try {
        const valorJSON = localStorage.getItem('ultimoProducto');
        if (valorJSON) {
            const valor = JSON.parse(valorJSON);
            mostrarResultado(`Último producto guardado: ${valor.name}`);
        }
    } catch (error) {
        notificar('Error al cargar los datos previos.', 'error');
    }
}

function notificar(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.className = `notificacion ${tipo}`;
    document.body.appendChild(notificacion);
    
    setTimeout(() => notificacion.remove(), 3000);
}

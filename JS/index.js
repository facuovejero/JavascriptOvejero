sessionStorage.setItem('cart', JSON.stringify([]));

const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

async function obtenerJson() {
    try {
        const response = await fetch('../JSON/storage.json');
        if (!response.ok) throw new Error('Error al cargar el JSON');
        const data = await response.json();
        console.log(data);
        return data; // Aseguramos que la función retorne el JSON cargado
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error al cargar los datos. Intenta nuevamente.', 'error');
        return []; // Retornamos un arreglo vacío en caso de error
    }
}

const contenedorTarjetas = document.getElementById("cardHtml");

/** Crea las tarjetas de productos teniendo en cuenta la lista obtenida */
function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        const entradaCard = document.createElement("div");
        entradaCard.classList = "cardDiv";
        entradaCard.innerHTML = `
        <img src="${producto.image}" alt="imagen de ${producto.name}" class="imgCards">
        <h3 class="h3Card">${producto.name}</h3>
        <h3 class="h3Card">$${producto.precio}</h3>
        <h4 class="h4Card">Stock: ${producto.stock}</h4>
        <button id="${producto.id}" class="card-button">Agregar al carrito</button>`;
        contenedorTarjetas.appendChild(entradaCard);
        
        entradaCard.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
    });
}

// Llamar a obtenerJson y crear las tarjetas
(async () => {
    const entradas = await obtenerJson();
    crearTarjetasProductosInicio(entradas);
})();
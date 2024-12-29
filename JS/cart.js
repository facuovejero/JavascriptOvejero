localStorage.setItem('cart', JSON.stringify([]));

// Inicializa el carrito correctamente sincronizado con sessionStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

async function obtenerJson() {
    try {
        const response = await fetch('../JSON/storage.json');
        if (!response.ok) throw new Error('Error al cargar el JSON');
        const data = await response.json();
        return data; // Aseguramos que la función retorne el JSON cargado
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error al cargar los datos. Intenta nuevamente.', 'error');
        return []; // Retornamos un arreglo vacío en caso de error
    }
}

// Llamar a obtenerJson y crear las tarjetas
(async () => {
    const entradas = await obtenerJson();
    crearTarjetasProductosInicio(entradas);
})();


const contenedorTarjetas = document.getElementById("cardHtml");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const reiniciarCarritoElement = document.getElementById("reiniciar");



/** Crea las tarjetas de productos teniendo en cuenta la lista obtenida */
function crearTarjetasProductosInicio() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("entradas"));
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const entradaCard = document.createElement("div");
            entradaCard.classList = "cardDivCart";
            entradaCard.innerHTML = `
            <img src="../${producto.image}" alt="imagen de ${producto.name}" class="imgCart">
            <h3>${producto.name}</h3>
            <h3>$${producto.precio}</h3>
            <h4>Stock: ${producto.stock}</h4>
            <div>
                <button class="buttonCart">-</button>
                <span class="cantidad">${producto.cantidad}</span>
                <button class="buttonCart">+</button>
            </div>`;
            contenedorTarjetas.appendChild(entradaCard);

            entradaCard.getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    restarAlCarrito(producto);
                    crearTarjetasProductosInicio();
                    actualizarTotales();
                });
            entradaCard.getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = agregarAlCarrito(producto);
                    actualizarTotales();
                });
        });
    }
}



function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("entradas"));
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length > 0){
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
    }
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
}

actualizarTotales()

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito(){
    localStorage.removeItem("entradas");
    actualizarTotales();
    crearTarjetasProductosInicio();
}
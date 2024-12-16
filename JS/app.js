sessionStorage.setItem('cart', JSON.stringify([]));
const cart = []; 

class Entradas {
    constructor(id, name, precio, stock, image) {
        this.id = id;
        this.name = name;
        this.precio = precio;
        this.stock = stock;
        this.image = image;
    }
}

const menuEntradas = [
    new Entradas(1, "Duki", 140, 4, 'img/dukiAmeri.jpg'),
    new Entradas(2, "Airbag", 110, 8, 'img/airbagShow.jpg'),
    new Entradas(3, "Margarita", 50, 15, 'img/margarita.jpg'),
    new Entradas(5, "AC/DC", 190, 4, 'img/AcDc.jpg'),
];

if (!sessionStorage.getItem('menuEntradas')) {
    sessionStorage.setItem('menuEntradas', JSON.stringify(menuEntradas));
}

function actualizarStockCard(productId, nuevoStock) {
    const card = document.querySelector(`#cardHtml .cardDiv button[id='${productId}']`).parentElement;
    const stockElement = card.querySelector(".h4Card");
    if (stockElement) {
        stockElement.textContent = `Stock: ${nuevoStock}`;
    }
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo) {
    const main = document.querySelector("main");
    const notification = document.createElement("div");
    notification.classList.add(
        tipo === "error" ? "bg-red-500" : "bg-green-500",
        "text-white",
        "p-4",
        "rounded-md",
        "fixed",
        "top-1/2",
        "left-1/2",
        "transform",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "z-50"
    );
    notification.innerHTML = mensaje;
    main.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function mostrarTotalCompra() {
    if (cart.length === 0) return;

    const total = cart.reduce((acc, { precio }) => acc + precio, 0);
    const totalContainer = document.getElementById("totalContainer") || document.createElement("div");
    totalContainer.id = "totalContainer";
    totalContainer.classList.add("total-message");
    totalContainer.textContent = `Total acumulado: $${total}`;
    document.querySelector("main").appendChild(totalContainer);
}

function loadEvents() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const menuEntradas = JSON.parse(sessionStorage.getItem('menuEntradas')) || [];
            const selectedProduct = menuEntradas.find(entrada => entrada.id === Number(button.id));
            if (selectedProduct) {
                if (selectedProduct.stock > 0) {
                    selectedProduct.stock -= 1;
                    cart.push({ ...selectedProduct });
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    sessionStorage.setItem('menuEntradas', JSON.stringify(menuEntradas));
                    actualizarStockCard(selectedProduct.id, selectedProduct.stock);
                    mostrarTotalCompra();
                    mostrarNotificacion(`¡Compra realizada con éxito!`, "success");
                } else {
                    mostrarNotificacion(`Lo sentimos, no tenemos suficiente stock de ${selectedProduct.name}.`, "error");
                }
            }
        });
    });
}

function createCard(menuEntradas) {
    const cards = document.querySelector("#cardHtml");
    menuEntradas.forEach(({ id, name, precio, stock, image }) => {
        const card = document.createElement("div");
        card.classList.add('cardDiv');
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="imgCards">
            <h3 class="h3Card">${name}</h3>
            <h3 class="h3Card">$${precio}</h3>
            <h4 class="h4Card">Stock: ${stock}</h4>
            <button id="${id}" class="button">Comprar</button>
        `;
        cards.appendChild(card);
    });
    loadEvents();
}

const storedMenuEntradas = JSON.parse(sessionStorage.getItem('menuEntradas')) || [];
createCard(storedMenuEntradas);
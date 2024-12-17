sessionStorage.setItem('cart', JSON.stringify(Storage.json));
const cart = []; 

const entradas = `[
    {
        "id": 1,
        "name": "Duki",
        "precio": 140,
        "stock": 4,
        "image": "img/dukiAmeri.jpg"
    },
    {
        "id": 2,
        "name": "Airbag",
        "precio": 110,
        "stock": 8,
        "image": "img/airbagShow.jpg"
    },
    {
        "id": 3,
        "name": "Margarita",
        "precio": 50,
        "stock": 15,
        "image": "img/margarita.jpg"
    },
    {
        "id": 5,
        "name": "AC/DC",
        "precio": 190,
        "stock": 4,
        "image": "img/AcDc.jpg"  
    }
]`; //LA IMAGEN DE ACDC NO CUMPLE CON EL HEIGHT COMO LAS OTRAS

const jsonData = JSON.parse(entradas);

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
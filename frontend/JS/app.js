let entradasShop = "Venta de entradas Javascript";

const nombreUsuario = prompt ("Ingrese su nombre");
const apellidoUsuario = prompt ("Ingresa su apellido");

function saludarUsuario (parametro1, parametro2, parametro3) {
    alert ( parametro1 + " " + parametro2 + " " + parametro3);
};

saludarUsuario ("Bienvenidos", "a mi", "Simulador");
saludarUsuario ("Hola", nombreUsuario, apellidoUsuario);

alert ("Venta de entradas para shows en vivo");

let menuEntradas = [
    { id: 1, name: "Duki", precio: 40, stock: 4 },
    { id: 2, name: "Callejeros", precio: 15, stock: 8 },
    { id: 3, name: "Margarita", precio: 15, stock: 15 },
    { id: 4, name: "Taylor Swift", precio: 70, stock: 4 },
    { id: 5, name: "AC/DC", precio: 70, stock: 4 },
    { id: 6, name: "Callejero Fino", precio: 20, stock: 4 },
    { id: 7, name: "A toda Maquina", precio: 15, stock: 6 },
];

function showMenu() {
    alert("Proximos conciertos: ");
    menuEntradas.forEach(item => {
        alert(` ID: [${item.id}] | ${item.name} | ($${item.precio}) | Stock: ${item.stock}`);
    });
}

showMenu()

function entradasCompra (){
    let entradaId = parseInt (prompt ("Ingresa el ID del show que quieres comprar"));
    let entradaCantidad = parseInt (prompt ("Ingresa la cantidad de entradas"));
    let producto = menuEntradas.find(item => item.id === entradaId);
    debugger

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    if (producto.stock >= entradaCantidad){
        producto.stock -= entradaCantidad;
        let ordenTotal = producto.precio * entradaCantidad;
        debugger
        alert(`Has comprado ${producto.name} x ${entradaCantidad}. Total: $${ordenTotal.toFixed(2)}`);
    } else{
        alert(`Lo sentimos, no tenemos suficiente stock de ${producto.name}.`);
    }
}

entradasCompra()
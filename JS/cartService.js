function agregarAlCarrito (producto){
    const memoria = JSON.parse(localStorage.getItem("entradas"));
    let cuenta = 0;
    if(!memoria){
        const nuevoProducto = producto;
        nuevoProducto.cantidad= 1;
        localStorage.setItem("entradas", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else{
        const indiceProducto = memoria.findIndex(entrada => entrada.id === producto.id);
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        } else {
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("entradas", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
    return cuenta;
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("entradas"));
    const indiceProducto = memoria.findIndex(entrada => entrada.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto, 1);
    } else{
        memoria[indiceProducto].cantidad --;
    }
    localStorage.setItem("entradas", JSON.stringify(memoria));
    actualizarNumeroCarrito()
}

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto; 
}

const cuentaCarritoElement = document.getElementById("cuentaCarrito");

function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("entradas"));
    if(memoria && memoria.length > 0){
        const cuenta = memoria.reduce((acum, current) => acum+current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
    }else{
        cuentaCarritoElement.innerText = 0;
    }
}

actualizarNumeroCarrito();
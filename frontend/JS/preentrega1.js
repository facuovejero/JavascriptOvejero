// Simulador de procesos esenciales con notificaciones HTML, almacenamiento y eventos

// Al cargar la página, se definen los elementos esenciales
window.addEventListener('DOMContentLoaded', () => {
    crearElementosBase();
    cargarDatosPrevios();
});

// Función para crear los elementos HTML básicos
function crearElementosBase() {
    const app = document.getElementById('app');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'datoEntrada';
    input.placeholder = 'Ingresa un valor';
    
    const botonProcesar = document.createElement('button');
    botonProcesar.id = 'botonProcesar';
    botonProcesar.textContent = 'Procesar';
    botonProcesar.addEventListener('click', procesarDato);
    
    const salida = document.createElement('div');
    salida.id = 'salida';
    salida.textContent = 'Aquí se mostrarán los resultados.';
    
    app.appendChild(input);
    app.appendChild(botonProcesar);
    app.appendChild(salida);
}

// Función de procesamiento del simulador
function procesarDato() {
    const entrada = document.getElementById('datoEntrada').value;
    if (!entrada) {
        notificar('Por favor, ingresa un valor.', 'error');
        return;
    }
    
    const resultado = procesarSimulador(entrada);
    
    mostrarResultado(resultado);
    almacenarDato('ultimoResultado', resultado);
}

// Función que simula el procesamiento de un dato
function procesarSimulador(entrada) {
    // Aquí se puede colocar la lógica de simulación personalizada
    return `Resultado procesado para: ${entrada}`;
}

// Función para mostrar el resultado en el DOM
function mostrarResultado(resultado) {
    const salida = document.getElementById('salida');
    salida.textContent = resultado;
}

// Función para mostrar notificaciones en el DOM
function notificar(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.className = `notificacion ${tipo}`;
    document.body.appendChild(notificacion);
    
    setTimeout(() => notificacion.remove(), 3000); // La notificación se elimina después de 3 segundos
}

// Función para almacenar datos en el localStorage
function almacenarDato(clave, valor) {
    try {
        const valorJSON = JSON.stringify(valor);
        localStorage.setItem(clave, valorJSON);
        notificar('Datos almacenados con éxito.', 'exito');
    } catch (error) {
        notificar('Error al almacenar los datos.', 'error');
    }
}

// Función para recuperar datos del localStorage
function cargarDatosPrevios() {
    try {
        const valorJSON = localStorage.getItem('ultimoResultado');
        if (valorJSON) {
            const valor = JSON.parse(valorJSON);
            mostrarResultado(`Último resultado guardado: ${valor}`);
        }
    } catch (error) {
        notificar('Error al cargar los datos previos.', 'error');
    }
}

/**
 * Lógica de juego de misión espacial
 * 
 * @author Sebastián Gallegos Frías
 */

// Objeto nave que contiene la configuración de la misión espacial
const nave = {
    distanciaEstimada: 0,
    estadoMision: true,
    modelo: "",
    nombre: "",
    recursos: {
        agua: 100,
        comida: 100,
        energia: 100
    },
    tripulacion: [],
    /**
     * Muestra el estado general de la misión por consola.
     */
    mostrarEstado: function() {
        let estado = `\n=== ESTADO DE LA MISIÓN ===\n`;
        estado += `Estado: ${this.estadoMision ? "En curso" : "Finalizada"}\n`;
        estado += `Modelo: ${this.modelo}\n`;
        estado += `Nombre: ${this.nombre}\n`;
        estado += `Distancia estimada a destino: ${this.distanciaEstimada} km\n`;
        console.log(estado);
    },
    /**
     * Muestra el estado de los recursos por consola.
     */
    reportarRecursos: function() {
        let recursos = "Recursos disponibles:\n";
        recursos += `Agua: ${this.recursos.agua.toString().padStart(3, ' ')} litros\n`;
        recursos += `Comida: ${this.recursos.comida.toString().padStart(3, ' ')} kg\n`;
        recursos += `Energía: ${this.recursos.energia.toString().padStart(3, ' ')} unidades\n`;
        console.log(recursos);
    },
}

function generarRecursos(nave) {
    nave.recursos.agua = Math.floor(Math.random() * 50) + 50; // Entre 50 y 150 litros
    nave.recursos.comida = Math.floor(Math.random() * 50) + 50; // Entre 50 y 150 kg
    nave.recursos.energia = Math.floor(Math.random() * 50) + 50; // Entre 50 y 150 unidades
}

/**
 * Agrega un tripulante a la nave.
 * @param {string} nombre - Nombre del tripulante.
 * @param {string} rol - Rol del tripulante.
 * @param {number} salud - Nivel de salud del tripulante (0-100).
 */
function agregarTripulante(nombre, rol, salud) {
    if (salud < 0 || salud > 100) {
        console.log("El nivel de salud debe estar entre 0 y 100.");
        return;
    }
    const tripulante = {
        nombre: nombre,
        rol: rol,
        salud: salud
    };
    nave.tripulacion.push(tripulante);
}

// crear 10 tripulantes
const roles = ["Piloto", "Ingeniero", "Médico", "Científico", "Técnico", "Comunicaciones", "Seguridad", "Logística", "Explorador", "Mecánico"];
roles.forEach((rol, i) => {
    const nombre = `Tripulante ${i + 1}`;
    const salud = Math.floor(Math.random() * 101); // Salud aleatoria entre 0 y 100
    agregarTripulante(nombre, rol, salud);
});

function mostrarTripulacion(nave) {
    let mensaje = "\n--- Tripulación de la nave ---\n";
    nave.tripulacion.forEach(tripulante => {
        mensaje += `Nombre: ${tripulante.nombre.padEnd(15)} | Rol: ${tripulante.rol.padEnd(12)} | Salud: ${tripulante.salud.toString().padStart(3, ' ')}\n`;
    });
    console.log(mensaje);
}

/**
 * Calcula y muestra el promedio de salud de la tripulación.
 * @param {Object} nave Objeto nave.
 */
function promedioSalud(nave) {
    let suma = 0;
    for (let i = 0; i < nave.tripulacion.length; i++) {
        suma += nave.tripulacion[i].salud;
    }
    const promedio = nave.tripulacion.length > 0 ? (suma / nave.tripulacion.length) : 0;
    console.log("Promedio de salud de la tripulación: ".concat(promedio.toFixed(2)));
}

/**
 * Calcula y muestra la cantidad de tripulantes con salud menor a 50.
 * @param {Object} nave - Objeto nave.
 */
function cantidadSaludBaja(nave) {
    let contador = 0;
    for (let i = 0; i < nave.tripulacion.length; i++) {
        if (nave.tripulacion[i].salud < 50) contador++;
    }
    console.log(`Cantidad de tripulantes con salud menor a 50: ${contador}`);
}

/**
 * Muestra el estado detallado de los recursos de la nave.
 * 
 * @param {Object} nave Objeto nave.
 */
function estadoRecursos(nave) {
    let mensaje = "Estado de los recursos:\n";
    mensaje += `- Agua: ${nave.recursos.agua.toString().padStart(3, ' ')} litros\n`;
    mensaje += `- Comida: ${nave.recursos.comida.toString().padStart(3, ' ')} kg\n`;
    mensaje += `- Energía: ${nave.recursos.energia.toString().padStart(3, ' ')} unidades\n`;
    console.log(mensaje);
}

/**
 * Simula la misión espacial, gestionando recursos y salud de la tripulación por día.
 * Solicita nombre y modelo de la nave, y reinicia el estado para cada simulación.
 */
function simularMision() {
    // Solicitar nombre y modelo de la nave al usuario al inicio de la simulación
    const nombreNave = prompt("Ingrese el nombre de la nave:");
    const modeloNave = prompt("Ingrese el modelo de la nave:");
    nave.nombre = nombreNave ? nombreNave : "Sin nombre";
    nave.modelo = modeloNave ? modeloNave : "Sin modelo";
    // Reiniciar recursos y estado de misión
    nave.distanciaEstimada = 0;
    nave.estadoMision = true;
    nave.recursos.agua = 100;
    nave.recursos.comida = 100;
    nave.recursos.energia = 100;
    // Reiniciar salud de la tripulación
    nave.tripulacion.forEach(tripulante => {
        tripulante.salud = Math.floor(Math.random() * 101);
    });

    let dias = 0;
    while (nave.estadoMision && dias < 30) { // Simular hasta 30 días
        console.clear();
        console.log(`\nDía ${dias + 1}`);
        mostrarTripulacion(nave);
        nave.mostrarEstado();
        nave.reportarRecursos();
        promedioSalud(nave);
        cantidadSaludBaja(nave);
        estadoRecursos(nave);

        const opcion = prompt("Elige una acción: 1. Explorar 2. Comer 3. Descansar 4. Reportar estado (1-4): ");
        
        switch (opcion) {
            case '1': // Explorar
                const exploracion = Math.floor(Math.random() * 20) + 1; // Reduce recursos aleatoriamente
                nave.recursos.agua -= exploracion;
                nave.recursos.comida -= exploracion;
                nave.recursos.energia -= exploracion;
                nave.tripulacion.forEach(tripulante => {
                    tripulante.salud -= Math.floor(Math.random() * 10); // Puede afectar salud
                });
                console.log(`Exploración realizada, recursos reducidos en ${exploracion}.`);
                break;
            case '2': // Comer
                if (nave.recursos.comida >= 10) {
                    nave.recursos.comida -= 10;
                    nave.tripulacion.forEach(tripulante => {
                        tripulante.salud += 5; // Mejora salud
                        if (tripulante.salud > 100) tripulante.salud = 100; // Salud no puede superar 100
                    });
                    console.log("Comida consumida, salud de la tripulación mejorada.");
                } else {
                    console.log("No hay suficiente comida para comer.");
                }
                break;
            case '3': // Descansar
                nave.tripulacion.forEach(tripulante => {
                    tripulante.salud += 10; // Recupera salud
                    if (tripulante.salud > 100) tripulante.salud = 100; // Salud no puede superar 100
                });
                console.log("Descanso realizado, salud de la tripulación recuperada.");
                break;
            case '4': // Reportar estado
                console.clear();
                nave.mostrarEstado();
                nave.reportarRecursos();
                mostrarTripulacion(nave);
                promedioSalud(nave);
                cantidadSaludBaja(nave);
                estadoRecursos(nave);
                break;
            default:
                console.log("Opción no válida. Por favor, elige una opción entre 1 y 4.");
                continue;
        }
        // Verificar recursos
        if (nave.recursos.agua < 0 || nave.recursos.comida < 0 || nave.recursos.energia < 0) {
            console.log("Recursos agotados, la misión ha fracasado.");
            nave.estadoMision = false;
        }
        // Verificar salud de la tripulación
        if (nave.tripulacion.some(tripulante => tripulante.salud <= 0)) {
            console.log("Un tripulante ha caído, la misión ha fracasado.");
            nave.estadoMision = false;
        }
        dias++;
    }
    if (nave.estadoMision) {
        console.log("La misión ha finalizado exitosamente.");
    }
}
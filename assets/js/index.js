// Fase 1 - configuración de misión
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
    mostrarEstado: function() {
        console.log(`Estado de la misión: ${this.estadoMision ? "En curso" : "Finalizada"}`);
        console.log(`Modelo de nave: ${this.modelo}`);
        console.log(`Nombre de la nave: ${this.nombre}`);
        console.log(`Distancia estimada a destino: ${this.distanciaEstimada} km`);
    },
    reportarRecursos: function() {
        console.log("Recursos disponibles:");
        console.log(`Agua: ${this.recursos.agua} litros`);
        console.log(`Comida: ${this.recursos.comida} kg`);
        console.log(`Energía: ${this.recursos.energia} unidades`);
    },
}

function generarRecursos(nave) {
    nave.recursos.agua = Math.floor(Math.random() * 50) + 50; // Entre 50 y 150 litros
    nave.recursos.comida = Math.floor(Math.random() * 50) + 50; // Entre 50 y 150 kg
    nave.recursos.energia = Math.floor(Math.random() * 50) + 50; // Entre 50 y 150 unidades
}

// Fase 2 - registro de tripulantes
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
    console.log("Tripulación de la nave:");
    nave.tripulacion.forEach(tripulante => {
        console.log(`Nombre: ${tripulante.nombre}, Rol: ${tripulante.rol}, Salud: ${tripulante.salud}`);
    });
}

// Fase 3
function simularMision() {
    let dias = 0;
    while (nave.estadoMision && dias < 30) { // Simular hasta 30 días
        console.clear();
        console.log(`\nDía ${dias + 1}`);
        mostrarTripulacion(nave);
        nave.mostrarEstado();
        nave.reportarRecursos();

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
                nave.mostrarEstado();
                nave.reportarRecursos();
                mostrarTripulacion(nave);
                break;
            default:
                console.log("Opción no válida. Por favor, elige una opción entre 1 y 4.");
                continue; // Volver al inicio del ciclo
        }
        // Verificar recursos
        if (nave.recursos.agua < 0 || nave.recursos.comida < 0 || nave.recursos.energia < 0) {
            console.log("¡Recursos agotados! La misión ha fracasado.");
            nave.estadoMision = false;
        }
        // Verificar salud de la tripulación
        if (nave.tripulacion.some(tripulante => tripulante.salud <= 0)) {
            console.log("¡Un tripulante ha caído! La misión ha fracasado.");
            nave.estadoMision = false;
        }
        dias++;
    }
    if (nave.estadoMision) {
        console.log("La misión ha finalizado exitosamente.");
    }
}
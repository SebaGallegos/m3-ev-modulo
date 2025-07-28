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

generarRecursos(nave);

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
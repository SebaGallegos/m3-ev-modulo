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
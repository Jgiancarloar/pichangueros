import { v4 as uuidv4 } from 'uuid';

// Función para mezclar (shuffle) un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function crearFixture(equipos) {
    // Mezclar el array de equipos
    const shuffledEquipos = shuffleArray([...equipos]);

    // Trabajar con una copia mezclada del array de equipos
    let newEquipos = [...shuffledEquipos];
    if (newEquipos.length % 2 !== 0) {
        newEquipos.push("Descansa");
    }
    const numEquipos = newEquipos.length;
    const fixture = [];

    // Generar el fixture por rondas
    for (let ronda = 0; ronda < numEquipos - 1; ronda++) {
        const jornada = {
            id: uuidv4(),
            partidos: []
        };

        for (let i = 0; i < numEquipos / 2; i++) {
            const local = newEquipos[i];
            const visitante = newEquipos[numEquipos - 1 - i];
            const partido = {
                id: uuidv4(),
                local: local,
                visitante: visitante,
                golesLocal: '',
                golesVisitante: '',
                ganador: null,
                puntosLocal: 0,   // Añadir puntosLocal
                puntosVisitante: 0 // Añadir puntosVisitante
            };
            jornada.partidos.push(partido);
        }
        fixture.push(jornada);

        // Rotar equipos excepto el primero (se mantiene fijo)
        newEquipos.splice(1, 0, newEquipos.pop());
    }
    return fixture;
}

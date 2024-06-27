import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = JSON.parse(localStorage.getItem('championship')) || []

const championshipSlice = createSlice({
    name: 'championship',
    initialState,
    reducers: {
        addChampionship: (state, action) => {
            const newChampionship = {
                id: uuidv4(),
                ...action.payload
            }
            state.push(newChampionship)
            localStorage.setItem('championship', JSON.stringify(state))
        },
        deleteChampionship: (state, action) => {
            const { id } = action.payload
            console.log(id)
            const newState = state.filter(championship => championship.id !== id);
            localStorage.setItem('championship', JSON.stringify(newState));
            return newState;
        },
        addTeam: (state, action) => {
            const { championshipId, team } = action.payload;
            const championship = state.find(champ => champ.id === championshipId);
            if (championship) {
                if (!championship.teams) {
                    championship.teams = [];
                }
                championship.teams.push({
                    id: uuidv4(),
                    ...team
                });
                localStorage.setItem('championship', JSON.stringify(state));
            }
        },
        deleteTeam: (state, action) => {
            const { championshipId, id } = action.payload
            const championship = state.find(champ => champ.id === championshipId)
            if (championship) {
                championship.teams = championship.teams.filter(team => team.id !== id)
                localStorage.setItem('championship', JSON.stringify(state))
            }
        },
        addFixture: (state, action) => {
            const { championshipId, fixture } = action.payload;
            const championship = state.find(champ => champ.id === championshipId);

            if (championship) {
                championship.fixture = fixture;
                localStorage.setItem('championship', JSON.stringify(state));
            }
        },
        updateScore: (state, action) => {
            const { championshipId, rondaId, partidoId, golesLocal, golesVisitante } = action.payload;
            const championship = state.find(champ => champ.id === championshipId);
            
            if (championship) {
                const ronda = championship.fixture.find(ronda => ronda.id === rondaId);
                
                if (ronda) {
                    const partido = ronda.partidos.find(partido => partido.id === partidoId);
                    
                    if (partido) {
                        // Actualizar golesLocal si es diferente de vacío
                        if (golesLocal !== '') {
                            const golesLocalInt = parseInt(golesLocal, 10);
                            partido.golesLocal = golesLocalInt;
                        }
            
                        // Actualizar golesVisitante si es diferente de vacío
                        if (golesVisitante !== '') {
                            const golesVisitanteInt = parseInt(golesVisitante, 10);
                            partido.golesVisitante = golesVisitanteInt;
                        }
            
                        // Actualizar ganador si ambos goles tienen valores numéricos válidos
                        if (!isNaN(partido.golesLocal) && !isNaN(partido.golesVisitante)) {
                            if (partido.golesLocal > partido.golesVisitante) {
                                partido.ganador = partido.local;
                                partido.puntosLocal += 3; // Sumar 3 puntos al equipo local por ganar
                                partido.puntosVisitante += 0; // No sumar puntos al equipo visitante por perder
                            } else if (partido.golesVisitante > partido.golesLocal) {
                                partido.ganador = partido.visitante;
                                partido.puntosLocal += 0; // No sumar puntos al equipo local por perder
                                partido.puntosVisitante += 3; // Sumar 3 puntos al equipo visitante por ganar
                            } else {
                                partido.ganador = 'Empate';
                                partido.puntosLocal += 1; // Sumar 1 punto al equipo local por empate
                                partido.puntosVisitante += 1; // Sumar 1 punto al equipo visitante por empate
                            }
                        }
            
                        // Actualizar el estado en localStorage
                        localStorage.setItem('championship', JSON.stringify(state));
                    }
                }
            }
        },
    }
})

export const { addChampionship, deleteChampionship, addTeam, deleteTeam, addFixture, updateScore } = championshipSlice.actions;
export default championshipSlice.reducer;
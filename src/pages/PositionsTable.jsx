import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PositionsTable = () => {
    const { id } = useParams()
    const championship = useSelector(state => state.championship.find(champ => champ.id === id));

    if (!championship) {
        return <div>Cargando...</div>;
    }

    const equipos = championship.teams || [];

    const tablaPosiciones = equipos.map(equipo => {
        const partidosEquipo = championship.fixture.reduce((acc, ronda) => {
            const partidos = ronda.partidos.filter(partido => partido.local === equipo.name || partido.visitante === equipo.name);
            return acc.concat(partidos);
        }, []);

        const partidosJugados = partidosEquipo.filter(partido => partido.golesLocal !== '' && partido.golesVisitante !== '').length;
        const partidosGanados = partidosEquipo.filter(partido => partido.ganador === equipo.name).length;
        const partidosEmpatados = partidosEquipo.filter(partido => partido.ganador === 'Empate').length;
        const partidosPerdidos = partidosJugados - (partidosGanados + partidosEmpatados);
        const golesFavor = partidosEquipo.reduce((total, partido) => {
            if (partido.local === equipo.name && partido.golesLocal !== '') {
                return total + (partido.golesLocal || 0);
            } else if (partido.visitante === equipo.name && partido.golesVisitante !== '') {
                return total + (partido.golesVisitante || 0);
            }
            return total;
        }, 0);
        const golesContra = partidosEquipo.reduce((total, partido) => {
            if (partido.local === equipo.name && partido.golesVisitante !== '') {
                return total + (partido.golesVisitante || 0);
            } else if (partido.visitante === equipo.name && partido.golesLocal !== '') {
                return total + (partido.golesLocal || 0);
            }
            return total;
        }, 0);
        const diferenciaGoles = golesFavor - golesContra;
        const puntos = (partidosGanados * 3) + partidosEmpatados;

        return {
            ...equipo,
            partidosJugados,
            partidosGanados,
            partidosEmpatados,
            partidosPerdidos,
            golesFavor,
            golesContra,
            diferenciaGoles,
            puntos
        };
    });

    tablaPosiciones.sort((a, b) => {
        if (b.puntos !== a.puntos) {
            return b.puntos - a.puntos;
        }
        return b.diferenciaGoles - a.diferenciaGoles;
    });

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">Tabla de Posiciones</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Equipo</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">PJ</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">PG</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">PE</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">PP</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">GF</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">GC</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">DG</th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pts</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {tablaPosiciones.map((equipo, index) => (
                                <tr key={equipo.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-white">{equipo.name}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.partidosJugados}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.partidosGanados}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.partidosEmpatados}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.partidosPerdidos}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.golesFavor}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.golesContra}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.diferenciaGoles}</td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-300">{equipo.puntos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PositionsTable;

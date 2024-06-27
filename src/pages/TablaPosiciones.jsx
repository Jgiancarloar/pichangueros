import React from 'react';

const Equipos = [
  { nombre: 'Equipo A', puntos: 20, partidosJugados: 10, ganados: 6, empatados: 2, perdidos: 2, golesFavor: 18, golesContra: 10 },
  { nombre: 'Equipo B', puntos: 18, partidosJugados: 10, ganados: 5, empatados: 3, perdidos: 2, golesFavor: 15, golesContra: 12 },
  { nombre: 'Equipo C', puntos: 15, partidosJugados: 10, ganados: 4, empatados: 3, perdidos: 3, golesFavor: 12, golesContra: 11 },
  { nombre: 'Equipo D', puntos: 13, partidosJugados: 10, ganados: 3, empatados: 4, perdidos: 3, golesFavor: 10, golesContra: 10 },
  { nombre: 'Equipo E', puntos: 12, partidosJugados: 10, ganados: 3, empatados: 3, perdidos: 4, golesFavor: 9, golesContra: 11 },
];

const TablaPosiciones = () => {
  return (
    <div className="container mx-auto p-4 bg-red-800 text-white">
      <h1 className="text-3xl font-bold mb-8">Tabla de Posiciones - Variante 10</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden shadow-md">
          <thead className="bg-red-700">
            <tr>
              <th className="py-2 px-4">Pos.</th>
              <th className="py-2 px-4">Equipo</th>
              <th className="py-2 px-4">Pts.</th>
              <th className="py-2 px-4">PJ</th>
              <th className="py-2 px-4">PG</th>
              <th className="py-2 px-4">PE</th>
              <th className="py-2 px-4">PP</th>
              <th className="py-2 px-4">GF</th>
              <th className="py-2 px-4">GC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-700">
            {Equipos.map((equipo, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{equipo.nombre}</td>
                <td className="py-2 px-4">{equipo.puntos}</td>
                <td className="py-2 px-4">{equipo.partidosJugados}</td>
                <td className="py-2 px-4">{equipo.ganados}</td>
                <td className="py-2 px-4">{equipo.empatados}</td>
                <td className="py-2 px-4">{equipo.perdidos}</td>
                <td className="py-2 px-4">{equipo.golesFavor}</td>
                <td className="py-2 px-4">{equipo.golesContra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPosiciones;




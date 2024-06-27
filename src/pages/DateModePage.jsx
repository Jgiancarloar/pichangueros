import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateScore } from "../redux/sliceChampionship";

const DateModePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const championship = useSelector(state => state.championship.find(champ => champ.id === id));

  if (!championship) {
    return <div className="text-white text-center mt-8">Campeonato no encontrado</div>;
  }

  const { name, organizer, fixture } = championship;

  // Función para mover partidos de descansa al final de la jornada
  const sortPartidos = (partidos) => {
    const descansaIndex = partidos.findIndex(partido => partido.local === "Descansa" || partido.visitante === "Descansa");
    if (descansaIndex !== -1) {
      const descansaPartido = partidos.splice(descansaIndex, 1);
      partidos.push(descansaPartido[0]);
    }
    return partidos;
  };

  const handleGolesLocalChange = (rondaId, partidoId, golesLocal) => {
    dispatch(updateScore({
      championshipId: id,
      rondaId,
      partidoId,
      golesLocal: golesLocal.trim() !== '' ? parseInt(golesLocal, 10) : '',
      golesVisitante: fixture.find(ronda => ronda.id === rondaId).partidos.find(partido => partido.id === partidoId).golesVisitante
    }));
  };

  const handleGolesVisitanteChange = (rondaId, partidoId, golesVisitante) => {
    dispatch(updateScore({
      championshipId: id,
      rondaId,
      partidoId,
      golesLocal: fixture.find(ronda => ronda.id === rondaId).partidos.find(partido => partido.id === partidoId).golesLocal,
      golesVisitante: golesVisitante.trim() !== '' ? parseInt(golesVisitante, 10) : ''
    }));
  };

  return (
    <div className=" text-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-3xl font-bold">{name}</p>
          <p className="text-lg text-gray-300">Organizado por {organizer}</p>
        </div>
        {fixture.map((ronda, index) => (
          <div key={ronda.id} className="bg-gray-800 rounded-lg shadow-lg mb-6">
            <div className="px-6 py-4 bg-gray-700 rounded-t-lg">
              <p className="text-xl font-bold">Ronda {index + 1}</p>
            </div>
            <div className="divide-y divide-gray-700">
              {sortPartidos([...ronda.partidos]).map((partido, partidoIndex) => (
                <div key={partido.id} className="flex items-center justify-between py-4 px-6">
                  <div className="flex flex-col items-start">
                    {partido.local !== "Descansa" && partido.visitante !== "Descansa" ? (
                      <>
                        <p className="text-lg capitalize">{partido.local} {partido.ganador === partido.local && <span className="text-green-500">(G)</span>}</p>
                        <p className="text-lg capitalize">{partido.visitante} {partido.ganador === partido.visitante && <span className="text-green-500">(G)</span>}</p>
                      </>
                    ) : (
                      partido.local === "Descansa" ? (
                        <p className="text-lg text-green-400 italic">
                          <span className="capitalize">{partido.visitante}</span> descansa esta jornada.
                        </p>
                      ) : (
                        <p className="text-lg text-green-400 italic">
                          <span className="capitalize">{partido.local}</span> descansa esta jornada.
                        </p>
                      )
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    {partido.local !== "Descansa" && partido.visitante !== "Descansa" && (
                      <>
                        <input
                          type="number"
                          placeholder="0"
                          value={partido.golesLocal}
                          onChange={(e) => handleGolesLocalChange(ronda.id, partido.id, e.target.value)}
                          className="w-16 py-2 px-3 text-center text-gray-900 bg-gray-600 rounded-md focus:outline-none focus:bg-gray-700"
                        />
                        <span className="text-2xl text-gray-500">-</span>
                        <input
                          type="number"
                          placeholder="0"
                          value={partido.golesVisitante}
                          onChange={(e) => handleGolesVisitanteChange(ronda.id, partido.id, e.target.value)}
                          className="w-16 py-2 px-3 text-center text-gray-900 bg-gray-600 rounded-md focus:outline-none focus:bg-gray-700"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateModePage;

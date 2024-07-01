import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateTeam from "../components/forms/CreateTeam";
import { addFixture, deleteTeam } from "../redux/sliceChampionship";
import crearFixture from "../utils/DateMode";
import { MdDelete } from "react-icons/md";

const DetailChampionship = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const championship = useSelector((state) =>
    state.championship.find((championship) => championship.id === id)
  );
  const teams = championship?.teams;
  const teamsNames = teams?.map((team) => team.name);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }, [showModal]);

  const handleCreate = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (id) => {
    dispatch(deleteTeam({ championshipId: championship.id, id }));
  };

  const handleStartChampionship = (id) => {
    dispatch(addFixture({ championshipId: id, fixture: crearFixture(teamsNames) }));
    navigate(`/date-mode/${id}`);
  };

  const handleWatchFixture = (id) => {
    navigate(`/date-mode/${id}`);
  };

  const handleWatchPositionsTable = (id) => {
    navigate(`/positions-table/${id}`);
  };

  const handleWatchTeams = (id) => {
    navigate(`/list-of-teams/${id}`);
  };

  return (
    <div className="text-white max-w-lg mx-auto">
      <div className="mb-8">
        <p className="text-lg capitalize">Nombre: {championship.name}</p>
        <p className="text-lg capitalize">Organizador: {championship.organizer}</p>
        <p className="text-lg">N° de equipos: {teams?.length}</p>
      </div>
      <div className="mb-8">
        {!championship?.fixture && (
          <button
            onClick={handleCreate}
            className="bg-green-500 font-bold hover:bg-green-600 text-black py-2 px-4 rounded-lg"
          >
            Agregar equipo
          </button>
        )}
        {showModal && (
          <CreateTeam
            isOpen={showModal}
            onOpenChange={setShowModal}
            championshipId={championship.id}
          />
        )}
      </div>
      <div className="space-y-4">
        {!championship.fixture && (teams?.map((team, index) => (
          <div
            key={team.id}
            className="border border-gray-700 p-4 rounded-lg flex justify-between items-center bg-gray-800"
          >
            <h3 className="text-lg font-semibold capitalize">N° {index + 1}: {team.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(team.id)}
                className="bg-red-500 bg-opacity-20 font-semibold hover:bg-red-600 text-red-500 py-2 px-4 rounded-lg transition duration-200"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        )))}
      </div>
      <div className="mt-8">
        {teams?.length > 1 && !championship?.fixture && (
          <button
            onClick={() => handleStartChampionship(championship.id)}
            className="bg-green-500 font-bold hover:bg-green-600 text-black py-2 px-4 rounded-lg"
          >
            Iniciar campeonato
          </button>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        {championship?.fixture && (
          <button
            onClick={() => handleWatchTeams(championship.id)}
            className="bg-green-500 font-bold hover:bg-green-600 text-black py-2 px-4 rounded-lg w-64"
          >
            Ver Equipos
          </button>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        {championship?.fixture && (
          <button
            onClick={() => handleWatchFixture(championship.id)}
            className="bg-green-500 font-bold hover:bg-green-600 text-black py-2 px-4 rounded-lg w-64"
          >
            Ver Fixture
          </button>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        {championship?.fixture && (
          <button
            onClick={() => handleWatchPositionsTable(championship.id)}
            className="bg-green-500 font-bold hover:bg-green-600 text-black py-2 px-4 rounded-lg w-64"
          >
            Ver Tabla de Posiciones
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailChampionship;

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { Button, useDisclosure } from "@nextui-org/react";
import CreateTeam from "../components/forms/CreateTeam";
import { useState } from "react";
import { addFixture, deleteTeam } from "../redux/sliceChampionship";
import crearFixture from "../utils/DateMode";

const DetailChampionship = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const championship = useSelector(state => state.championship.find(championship => championship.id === id));
    const teams = championship?.teams;
    const teamsNames = teams?.map(team => team.name);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showModal, setShowModal] = useState(false)

    const handleCreate = () => {
        setShowModal(!showModal);
    }

    const handleDelete = (id) => {
        dispatch(deleteTeam({ championshipId: championship.id, id }))
    }

    const handleStartChampionship = (id) => {
        dispatch(addFixture({ championshipId: id, fixture: crearFixture(teamsNames) }))
        navigate(`/date-mode/${id}`)
    }

    const handleWatchFixture = (id) => {
        navigate(`/date-mode/${id}`)
    }

    const handleWatchPositionsTable = (id) => {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2316480380.
        navigate(`/positions-table/${id}`)
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen pt-20 pb-5 px-5">
            <div>
                <p>Nombre: {championship.name}</p>
                <p>Organizador: {championship.organizer}</p>
                <p>N° de equipos: {teams?.length}</p>
            </div>
            <div>
                {!championship?.fixture && (
                    <Button onPress={onOpen} onClick={handleCreate} className="bg-green-400 font-bold hover:bg-green-500">
                        Agregar equipo
                    </Button>
                )}
                {showModal && <CreateTeam isOpen={isOpen} onOpenChange={onOpenChange} championshipId={championship.id} />}
            </div>
            <div>
                {teams?.map(team => (
                    <div key={team.id} className="border p-2 rounded-lg mb-2 flex justify-between items-center">
                        <h3>{team.name}</h3>
                        <div className="flex gap-1">
                            <Button size="sm" onClick={() => handleDelete(team.id)} className="bg-red-400 font-bold hover:bg-red-500">Eliminar</Button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {teams?.length > 1 && !championship?.fixture && (
                    <Button onClick={() => handleStartChampionship(championship.id)} className="bg-green-400 font-bold hover:bg-green-500">
                        Iniciar campeonato
                    </Button>
                )}
            </div>
            <div>
                {championship?.fixture && (
                    <Button onClick={() => handleWatchFixture(championship.id)} className="bg-green-400 font-bold hover:bg-green-500">
                        Ver Fixture
                    </Button>
                )}
            </div>
            <div>
                {championship?.fixture && (
                    <Button onClick={() => handleWatchPositionsTable(championship.id)} className="bg-green-400 font-bold hover:bg-green-500">
                        Ver Tabla de Posiciones
                    </Button>
                )}
            </div>
        </div>
    )
}

export default DetailChampionship
import { Button, useDisclosure } from "@nextui-org/react";
import CreateChampionship from "../components/forms/CreateChampionship";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChampionship } from "../redux/sliceChampionship";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ showModal, setShowModal ] = useState(false)

  const championships = useSelector(state=>state.championship)

  const handleCreate = () => {
    setShowModal(!showModal);
  }

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteChampionship({id}))
  }

  const handleInfo = (id) => {
    navigate(`/detail-championship/${id}`)
  }

  return (
    <div className='bg-gradient-to-br from-gray-900 to-black text-white min-h-screen pt-20 pb-5 px-5'>
      <h2>Bienvenido, Giancarlo</h2>
      <div>
        <Button onPress={onOpen} onClick={handleCreate} className="bg-green-400 font-bold hover:bg-green-500">Crear campeonato</Button>
        {showModal && <CreateChampionship isOpen={isOpen} onOpenChange={onOpenChange} />}
      </div>
      <div>
        {championships.map(championship => (
          <div key={championship.id} className="border p-2 rounded-lg mb-2 flex justify-between items-center">
            <h3>{championship.name}</h3>
            <div className="flex gap-1">
            <Button size="sm" onClick={() => handleInfo(championship.id)} className="bg-yellow-400 font-bold hover:bg-yellow-500">Info</Button>
            <Button size="sm" onClick={() => handleDelete(championship.id)} className="bg-red-400 font-bold hover:bg-red-500">Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChampionship } from "../redux/sliceChampionship";
import { useNavigate } from "react-router-dom";
import CreateChampionship from "../components/forms/CreateChampionship";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const championships = useSelector((state) => state.championship);

  const handleCreate = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteChampionship({ id }));
  };

  const handleInfo = (id) => {
    navigate(`/detail-championship/${id}`);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen pt-20 pb-5 px-5">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Bienvenido, Giancarlo</h2>
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={handleCreate}
            className="bg-[#1DB954] font-bold hover:bg-[#1ed760] text-black py-2 px-4 rounded-lg transition duration-200"
          >
            Crear campeonato
          </button>
          {showModal && <CreateChampionship isOpen={showModal} onOpenChange={setShowModal} />}
        </div>
        <div>
          {championships.map((championship) => (
            <div
              key={championship.id}
              className="border border-gray-700 p-4 rounded-lg mb-4 bg-gray-800"
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(championship.id)}>
                <h3 className="text-lg font-semibold">{championship.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInfo(championship.id)}
                    className="bg-yellow-500 font-bold hover:bg-yellow-600 text-black py-1 px-3 rounded-lg transition duration-200"
                  >
                    Info
                  </button>
                  <button
                    onClick={() => handleDelete(championship.id)}
                    className="bg-red-500 font-bold hover:bg-red-600 text-black py-1 px-3 rounded-lg transition duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              {expandedId === championship.id && (
                <div className="mt-4">
                  <p>Detalles del campeonato: {championship.details}</p>
                  {/* Agregar más detalles si es necesario */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

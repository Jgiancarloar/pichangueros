import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChampionship } from "../redux/sliceChampionship";
import { useNavigate } from "react-router-dom";
import CreateChampionship from "../components/forms/CreateChampionship";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

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
    <div className="text-white min-h-screen pt-20 pb-5 px-5">
      <div className="mx-auto">
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
          <h3 className="text-lg font-semibold mb-4 text-center">Mis campeonatos</h3>
          {championships.map((championship) => (
            <div
              key={championship.id}
              className="p-4 rounded-lg mb-4 bg-gray-800"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold capitalize">{championship.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInfo(championship.id)}
                    className="bg-yellow-500 bg-opacity-20 font-semibold hover:bg-yellow-600 text-yellow-500 py-2 px-4 rounded-lg transition duration-200"
                  >
                    <IoEyeSharp size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(championship.id)}
                    className="bg-red-500 bg-opacity-20 font-semibold hover:bg-red-600 text-red-500 py-2 px-4 rounded-lg transition duration-200"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

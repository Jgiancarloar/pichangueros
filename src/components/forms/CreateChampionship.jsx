import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addChampionship } from "../../redux/sliceChampionship";

const CreateChampionship = ({ isOpen, onOpenChange }) => {
  const dispatch = useDispatch();
  const [championship, setChampionship] = useState({
    name: "",
    organizer: "",
  });

  const handleChange = (e) => {
    setChampionship({ ...championship, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addChampionship(championship));
    setChampionship({
      name: "",
      organizer: "",
    });
    onOpenChange(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-5">
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Detalle del campeonato</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre del campeonato</label>
          <input
            className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            id="name"
            name="name"
            value={championship.name}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="organizer">Organizador</label>
          <input
            className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            id="organizer"
            name="organizer"
            value={championship.organizer}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-200"
            onClick={() => onOpenChange(false)}
          >
            Salir
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-200"
            onClick={handleSubmit}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChampionship;

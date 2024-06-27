import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam } from "../../redux/sliceChampionship";

const CreateTeam = ({ isOpen, onOpenChange, championshipId }) => {
    const dispatch = useDispatch();
    const [team, setTeam] = useState({
        name: "",
        delegate: "",
    });

    const handleChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        dispatch(addTeam({ championshipId, team }));
        setTeam({
            name: "",
            delegate: "",
        });
        onOpenChange(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-5">
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Detalle del equipo</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre del equipo</label>
                    <input
                        autoComplete="off"
                        className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        id="name"
                        name="name"
                        value={team.name}
                        onChange={handleChange}
                        type="text"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1" htmlFor="delegate">Delegado</label>
                    <input
                        autoComplete="off"
                        className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        id="delegate"
                        name="delegate"
                        value={team.delegate}
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

export default CreateTeam;

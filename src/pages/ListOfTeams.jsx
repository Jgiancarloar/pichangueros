import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";

const ListOfTeams = () => {

    const { id } = useParams();
    const championship = useSelector((state) => state.championship.find((championship) => championship.id === id));
    const teams = championship?.teams;

    return (
        <div className='text-white max-w-lg mx-auto'>
            <h3 className='text-lg font-semibold mb-4 uppercase text-center'>Lista de equipos participantes</h3>
            {
                teams?.map((team, index) => (
                    <div key={team.id} className='flex justify-between items-center p-4 rounded-lg mb-4 bg-neutral-700 w-full sm:w-2/3 mx-auto'>
                        <p className='capitalize'><span className='text-green-500'>N° {index + 1}: </span>{team.name}</p>
                        <button
                            className="bg-yellow-500 bg-opacity-20 font-semibold hover:bg-yellow-600 text-yellow-500 py-2 px-4 rounded-lg transition duration-200"
                        >
                            <IoEyeSharp size={20} />
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default ListOfTeams
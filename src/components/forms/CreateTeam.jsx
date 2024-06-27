import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam } from "../../redux/sliceChampionship";

const CreateTeam = ({ isOpen, onOpenChange, championshipId }) => {

    const dispatch = useDispatch()
    const [team, setTeam] = useState({
        name: '',
        delegate: ''
    })
    
    const handleChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value })
    }

    const handleSubmit = () =>{
        dispatch(addTeam({championshipId,team}))
        setTeam({
            name: '',
            delegate: ''
        })
        onOpenChange(false)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalle del equipo</ModalHeader>
                            <ModalBody>
                                <Input
                                    name="name"
                                    value={team.name }
                                    onChange={handleChange}
                                    size="sm" type="text" label="Nombre del equipo" />
                                <Input
                                    name="delegate"
                                    value={team.delegate }
                                    onChange={handleChange}
                                    size="sm" type="text" label="Delegado" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Salir
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateTeam
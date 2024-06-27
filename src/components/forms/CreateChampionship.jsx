import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChampionship } from "../../redux/sliceChampionship";

const CreateChampionship = ({ isOpen, onOpenChange }) => {

    const dispatch = useDispatch()
    const [championship, setChampionship] = useState({
        name: '',
        organizer: ''
    })

    const handleChange = (e) => {
        setChampionship({ ...championship, [e.target.name]: e.target.value })
    }

    const handleSubmit = () =>{
        dispatch(addChampionship(championship))
        setChampionship({
            name: '',
            organizer: ''
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
                            <ModalHeader className="flex flex-col gap-1">Detalle del campeonato</ModalHeader>
                            <ModalBody>
                                <Input
                                    name="name"
                                    value={championship.name }
                                    onChange={handleChange}
                                    size="sm" type="text" label="Nombre del campeonato" />
                                <Input
                                    name="organizer"
                                    value={championship.organizer }
                                    onChange={handleChange}
                                    size="sm" type="text" label="Organizador" />
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

export default CreateChampionship
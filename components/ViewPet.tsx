import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import PetCard, { PetType } from './PetCard'

export default function ViewPet({ pet }: { pet: PetType }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        查看
      </Button>

      <Modal size="2xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>宠物详情</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PetCard pet={pet} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

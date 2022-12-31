import PetCard, { PetType } from './PetCard'
import { Button, Modal, useModal } from '@nextui-org/react'

export default function ViewPet({ pet }: { pet: PetType }) {
  const { setVisible, bindings } = useModal()

  return (
    <>
      <Button size="sm" onPress={() => setVisible(true)}>
        查看
      </Button>

      <Modal
        autoMargin
        width="550px"
        blur
        aria-labelledby="modal-title"
        onClose={bindings.onClose}
        open={bindings.open}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Modal.Body>
          <PetCard pet={pet} />
        </Modal.Body>
      </Modal>
    </>
  )
}

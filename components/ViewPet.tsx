import PetCard, { PetType } from './PetCard'
import { EyeIcon } from './EyeIcon'
import { Modal, useModal } from '@nextui-org/react'
import { IconButton } from './IconButton'

export default function ViewPet({ pet }: { pet: PetType }) {
  const { setVisible, bindings } = useModal()

  return (
    <>
      <IconButton onClick={() => setVisible(true)}>
        <EyeIcon size={20} fill="#979797" />
      </IconButton>

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
          maxWidth: '100%',
        }}
      >
        <Modal.Body>
          <PetCard pet={pet} />
        </Modal.Body>
      </Modal>
    </>
  )
}

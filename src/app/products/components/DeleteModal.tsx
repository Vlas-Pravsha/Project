import { Button, Modal } from '@/components/ui'
import Image from 'next/image'
import type { ModalProps } from '@/hooks/useModal'

interface DeleteModalProps {
  deleteModalProps: ModalProps
}

function DeleteModal({ deleteModalProps }: DeleteModalProps) {
  return (
    <Modal {...deleteModalProps}>
      <Modal.Content>
        <Modal.Body>
          <div className="flex justify-end p-2">
            <Image
              src="/exit.svg"
              alt="Exit"
              className="h-5 w-5 hover:cursor-pointer"
              onClick={deleteModalProps.onClose}
              width="20"
              height="20"
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/delete.svg"
              alt="Delete"
              className="h-14 w-14"
              width="60"
              height="60"
            />
            <Modal.Text>
              Are you sure you want to delete this user?
            </Modal.Text>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center p-2">
          <Button variant="delete">Yes, I'm sure</Button>
          <Button variant="secondary" onClick={deleteModalProps.onClose}>No, cancel</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>

  )
}

export default DeleteModal

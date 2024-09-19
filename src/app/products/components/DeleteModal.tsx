import { Button, Modal } from '@/components/ui'
import { useProducts } from '@/contexts/'
import Image from 'next/image'
import type { ModalProps } from '@/hooks/useModal'

interface DeleteModalProps {
  deleteModalProps: ModalProps
  id?: string
}

function DeleteModal({ deleteModalProps, id }: DeleteModalProps) {
  const { deleteProduct, deleteProducts } = useProducts()

  const handleDeleteProduct = (id: string) => {
    deleteModalProps.onClose()
    if (id) {
      deleteProduct(id)
    }
    deleteProducts()
  }

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
              {id
                ? <p>Are you sure you want to delete this product?</p>
                : <p>Do you want to remove this product from list?</p> }
            </Modal.Text>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center p-2">
          <Button
            variant="delete"
            onClick={() => handleDeleteProduct(id!)}
          >
            Yes, I&apos;m sure
          </Button>
          <Button variant="secondary" onClick={deleteModalProps.onClose}>No, cancel</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>

  )
}

export default DeleteModal

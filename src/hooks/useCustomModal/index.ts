import { useModal, ModalProps } from 'naive-ui'

const modalRef = ref()
export const useCustomModal = () => {
  const modal = useModal()
  const openModal = (options: ModalProps = {}) => {

    if (modalRef.value) {
      modalRef.value.destroy()
    }
    const defaultContent = typeof options.content === 'string'
      ? options.content
      : 'This is a custom modal content.'

    modalRef.value = modal.create({
      content: () => h('div', null, [defaultContent]),
      preset: 'card',
      transformOrigin: 'mouse',
      maskClosable: true,
      style: {
        width: '40vw',
        height: '90vh',
        overflow: 'auto',
        borderRadius: '10px',
      },
      draggable: true,
      ...options,
      onClose: () => {
        closeModal()
        options.onClose?.()
      }
    })

  }

  const closeModal = () => {
    if (modalRef.value) {
      modalRef.value.destroy()
      modalRef.value = null
    }
  }

  return {
    openModal,
    closeModal,
  }
}

import { useModal, ModalProps } from 'naive-ui'
import { ref, h } from 'vue'

export const useCustomModal = () => {
  const modal = useModal()
  const modalRef = ref<ReturnType<typeof modal.create> | null>(null)

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
      transformOrigin: 'center',
      maskClosable: true,
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

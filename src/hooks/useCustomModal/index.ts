import { WindowOptions } from '@tauri-apps/api/window';
import { useModal, ModalOptions } from 'naive-ui'
import { ref } from 'vue'

const modalRef = ref()
type Options = WindowOptions & ModalOptions & {
  width: number;
  height: number;
}
export const useCustomModal = () => {
  const modal = useModal()
  const openModal = async (options: Options) => {
    const { width, height, title } = options
    if (modalRef.value) {
      modalRef.value.destroy()
    }
    if (window.__TAURI_OS_PLUGIN_INTERNALS__) {
      const modal = await getWindowByLabel('modal')
      if (modal) return
      await createWindow('modal', {
        width,
        height,
        title,
        titleBarStyle: 'overlay',
      }).catch(e => {
        console.log(e);
      })
      return
    }
    modalRef.value = modal.create({
      content: options.content,
      preset: 'card',
      maskClosable: true,
      draggable: true,
      ...options,
    })
    return modalRef.value
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

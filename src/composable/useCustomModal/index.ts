import { WebviewOptions } from '@tauri-apps/api/webview';
import { useModal, ModalOptions } from 'naive-ui'
import { ref } from 'vue'

const modalRef = ref()
type Options = Partial<WebviewOptions> & ModalOptions & {
  width: number;
  height: number;
  url?: string
  hiddenTitle?: boolean
  title?: string
}
export const useCustomModal = () => {
  const modal = useModal()
  const openModal = async (options: Options) => {
    const { width, height, title, url, hiddenTitle } = options
    if (modalRef.value) {
      modalRef.value.destroy()
    }
    if (window.__TAURI_OS_PLUGIN_INTERNALS__) {
      const modal = await getWindowByLabel(title as string)
      modal?.setFocus()
      if (modal) return
      await createWindow(title as string, {
        width,
        height,
        title,
        titleBarStyle: 'overlay',
        url,
        hiddenTitle,
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

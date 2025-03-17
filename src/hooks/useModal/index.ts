import { Modal } from "ant-design-vue";
import { DefineComponent } from "vue";
export const useModal = (content: DefineComponent<{}, {}, any>) => {
    const openModal = async () => {
        Modal.confirm({
            modalRender: () => h(content),
        })
    };
    return {
        openModal
    }
};
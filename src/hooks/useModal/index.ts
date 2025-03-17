import { Modal } from "ant-design-vue";
import { DefineComponent } from "vue";
export const useModal = (Content: DefineComponent<{}, {}, any>) => {
  const openModal = async () => {
    Modal.confirm({
      modalRender: () => h(Content),
    });
  };
  return {
    openModal,
  };
};

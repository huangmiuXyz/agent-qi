import { DefineComponent } from "vue";
import { useModal } from 'naive-ui'
export const useCustomModal = (Content: DefineComponent<{}, {}, any>) => {
  const openModal = async () => {
    useModal().create({
      title: 'Modal',
    });
  };
  return {
    openModal,
  };
};

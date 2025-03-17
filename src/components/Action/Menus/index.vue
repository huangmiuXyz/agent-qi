<template>
  <div class="h-full flex flex-col justify-between">
    <div class="mt-6">
      <div
        v-for="item in topMenus"
        :key="item.key"
        class="flex justify-center w-full mb-2"
      >
        <Button
          circle
          @click="handleClick(item)"
          :iconName="item.icon"
          :quaternary="activeMenu === item.key ? false : true"
        ></Button>
      </div>
    </div>
    <div>
      <div
        v-for="item in bottomMenus"
        :key="item.key"
        class="flex justify-center w-full mb-2"
      >
        <Button
          circle
          @click="handleClick(item)"
          :iconName="item.icon"
          :quaternary="activeMenu === item.key ? false : true"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomModal } from "@/hooks/useCustomModal";

const topMenus = computed(() =>
  menus.filter((item) => item.position !== "bottom")
);
const bottomMenus = computed(() =>
  menus.filter((item) => item.position === "bottom")
);

const { openModal } = useCustomModal();
const menus: MenuList = [
  {
    key: 1,
    label: "小说",
    path: "/Sections",
    icon: "ReadOutlined",
  },
  {
    key: 2,
    label: "设置",
    icon: "SettingOutlined",
    position: "bottom",
    onClick: () => {
      openModal({
        title: "设置",
        content: "设置面板内容",
        maskClosable: true,
      });
    },
  },
];
const router = useRouter();
const activeMenu = ref(1);
const handleClick = async (item: MenuItem) => {
  if (!item.path) {
    item.onClick?.();
    return;
  }
  activeMenu.value = item.key;
  router.push(item.path);
};
</script>

<style scoped></style>

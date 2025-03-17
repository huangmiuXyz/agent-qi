<template>
  <div class="h-full flex flex-col justify-between">
    <div class="mt-6">
      <div v-for="item in topMenus" :key="item.key" class="flex justify-center w-full mb-2">
        <Button @click="handleClick(item)" :iconName="item.icon" shape="circle"
          :type="activeMenu === item.key ? 'default' : 'text'"></Button>
      </div>
    </div>
    <div>
      <div v-for="item in bottomMenus" :key="item.key" class="flex justify-center w-full mb-2">
        <Button @click="handleClick(item)" :iconName="item.icon" shape="circle"
          :type="activeMenu === item.key ? 'default' : 'text'"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const topMenus = computed(() => menus.filter(item => item.position !== 'bottom'));
const bottomMenus = computed(() => menus.filter(item => item.position === 'bottom'));

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
    path: "/Settings",
    icon: "SettingOutlined",
    position: "bottom",
  },
];
const router = useRouter();
const activeMenu = ref(1);
const handleClick = (item: MenuItem) => {
  activeMenu.value = item.key;
  router.push(item.path);
};
</script>

<style scoped></style>

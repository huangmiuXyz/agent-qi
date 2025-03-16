<template>
  <div
    v-for="item in menus"
    :key="item.key"
    class="flex justify-center w-full mt-5"
  >
    <Button
      @click="handleClick(item)"
      :iconName="item.icon"
      shape="circle"
    ></Button>
  </div>
</template>

<script setup lang="ts">
const menus: MenuList = [
  {
    key: "1",
    label: "小说",
    path: "/Sections",
    icon: "ReadOutlined",
  },
];
const router = useRouter();
const handleClick = (item: MenuItem) => {
  router.push(item.path);
};
</script>

<style scoped></style>

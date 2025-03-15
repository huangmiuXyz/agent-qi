<template>
  <div v-for="item in menus" :key="item.id" class="w-full h-full">
    <Button>{{ item.name }}</Button>
  </div>
</template>

<script setup lang="ts">
const menus = [
  {
    id: 1,
    name: "小说",
    path: "/",
  },
];
</script>

<style scoped></style>

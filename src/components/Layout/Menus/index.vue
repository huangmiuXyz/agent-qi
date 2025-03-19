<template>
  <div class="h-full flex flex-col justify-between">
    <div class="mt-6">
      <div
        v-for="item in topMenus"
        :key="item.key"
        class="flex justify-center w-full mb-2"
      >
        <UIButton
          circle
          @click="handleClick(item.key)"
          :iconName="item.icon"
          :quaternary="activeMenu === item.key ? false : true"
        ></UIButton>
      </div>
    </div>
    <div>
      <div
        v-for="item in bottomMenus"
        :key="item.key"
        class="flex justify-center w-full mb-2"
      >
        <UIButton
          circle
          @click="handleClick(item.key)"
          :iconName="item.icon"
          :quaternary="activeMenu === item.key ? false : true"
        ></UIButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenus } from "./index";
const { handleClick, bottomMenus, topMenus, activeMenu } = useMenus();
</script>

<style scoped></style>

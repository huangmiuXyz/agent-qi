<template>
  <div class="h-full flex flex-col justify-between">
    <div :class="win.__TAURI_OS_PLUGIN_INTERNALS__ ? 'mt-6' : ''">
      <div
        v-for="item in topMenus"
        :key="item.key"
        class="flex justify-center w-full mb-2"
      >
        <UIButton
          circle
          @click="handleClick(item.key)"
          :iconName="callFunction(item.icon)"
          :secondary="activeMenu === item.key ? true : false"
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
          :iconName="callFunction(item.icon)"
          quaternary
        ></UIButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenus } from "./index";
const { handleClick, bottomMenus, topMenus, activeMenu } = useMenus();
import { callFunction } from "@/utils/type";
const win = window;
</script>

<style scoped></style>

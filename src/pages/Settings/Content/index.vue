<template>
  <div class="bg-settings-sidebar-content flex-1">
    <div class="mt-6 p-10">
      <div v-for="item in Form[getActiveMenu.value]" :key="item.title">
        <div class="font-bold text-xl">{{ item.title }}</div>
        <div class="text-gray-500">{{ item.description }}</div>
        <UIForm v-bind="{ ...item }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsMenu } from "~/Settings/composable/useSettingsMenu";
const { getActiveMenu, Form } = useSettingsMenu();
</script>

<style scoped></style>

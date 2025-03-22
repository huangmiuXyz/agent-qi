<template>
  <div class="bg-settings-sidebar-menu w-50 h-full p-2 select-none">
    <div
      class="flex flex-col gap-2"
      :class="win.__TAURI_OS_PLUGIN_INTERNALS__ ? 'mt-6' : ''"
    >
      <SettingsMenusItem
        @click="handleClickMenu(menu.key)"
        v-for="menu in menus"
        :key="menu.key"
        :menu="menu"
        :active="getActiveMenu.value === menu.key"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsMenu } from "~/Settings/composable/useSettingsMenu";
const { menus, getActiveMenu, handleClickMenu } = useSettingsMenu();
const win = window;
</script>

<style scoped></style>

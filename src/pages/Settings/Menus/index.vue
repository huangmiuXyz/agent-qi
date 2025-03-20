<template>
  <div class="bg-settings-sidebar-menu w-50 h-full p-2 select-none">
    <div class="mt-6 flex flex-col gap-2">
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
</script>

<style scoped></style>

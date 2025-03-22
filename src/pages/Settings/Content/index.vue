<template>
  <div class="bg-settings-sidebar-content flex-1">
    <div class="mt-6">
      <div v-for="item in getForm[getActiveMenu.value]" :key="item.title">
        <div
          class="select-none pl-9 pr-9 pb-2 font-medium text-base text-settings-content-text items-baseline"
        >
          {{ item.title }}
        </div>
        <div class="pl-5 pr-5">
          <UIForm
            class="bg-form p-4 rounded-lg"
            :schemas="item.schemas as unknown as FormSchema<SettingsFormKey>[]"
            label-placement="left"
            v-model="settings[getActiveMenu.value]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsMenu } from "~/Settings/composable/useSettingsMenu";
const { getActiveMenu, getForm } = useSettingsMenu();
const { settings } = settingsStore();
</script>

<style scoped></style>

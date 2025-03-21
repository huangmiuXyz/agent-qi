<template>
  <n-config-provider :theme="getDark ? darkTheme : null">
    <n-modal-provider>
      <Layout>
        <router-view />
      </Layout>
    </n-modal-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme } from "naive-ui";
const { getDark } = settingsStore();
watchEffect(() => {
  document.body.classList.toggle("dark", getDark.value);
});
</script>

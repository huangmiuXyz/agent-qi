<script setup lang="ts">
watchEffect(() => {
  const { getDark } = settingsStore();
  document.body.classList.toggle("dark", getDark.value);
});
</script>

<template>
  <n-modal-provider>
    <Layout>
      <router-view />
    </Layout>
  </n-modal-provider>
</template>

<script setup lang="ts">
  import { Suspense } from 'vue';
import './index.css'
</script>
<template>
 <Suspense>
  <router-view />
 </Suspense>
</template>

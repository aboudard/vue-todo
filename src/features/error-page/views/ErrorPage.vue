<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  ; (globalThis as { myUndefinedFunction?: () => void }).myUndefinedFunction!()
})
</script>

<template>
  <div class="p-3">
    <h2>Error page</h2>
  </div>
</template>

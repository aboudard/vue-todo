<template>
  <span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const { label } = defineProps<{
  label: string
}>();
</script>

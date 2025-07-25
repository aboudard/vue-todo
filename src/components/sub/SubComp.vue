<template>
  <span>
    {{ label }}
  </span> - 
  <UpComp :label="'Up Component'" />
</template>

<script setup lang="ts">
import UpComp from '../UpComp.vue';

const { label } = defineProps<{
  label: string
}>();
</script>

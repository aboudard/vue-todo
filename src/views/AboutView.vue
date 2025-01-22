<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { InputNumber } from 'primevue';
    const counter = useCounterStore()
</script>
<template>
  <h2>Counter with store</h2>
  <div class="mb-3"><InputNumber size="small" showButtons v-model="counter.count" /></div>
</template>

<style>

</style>

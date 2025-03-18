<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.store'
import { Button, InputNumber } from 'primevue'
const counter = useCounterStore()
</script>
<template>
  <h2 class="bg-red-100 mb-3 p-2">Counter with store</h2>
  <div class="mb-3"><InputNumber size="small" showButtons v-model="counter.count" /></div>
  <Button @click="counter.increment" size="small" label="Increment" />
</template>

<style></style>

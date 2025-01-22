<script setup lang="ts">
import { InputNumber } from 'primevue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
const count = ref(0)
const countString = computed({
  get: () => count.value.toString(),
  set: (val: string) => (count.value = parseInt(val)),
})
const title = ref('Counter with local ref')
const increment = () => count.value++
</script>
<template>
  <h2>{{ title?.toUpperCase() || 'Default' }}</h2>
  <div class="mb-3"><InputText size="small" readonly v-model="countString" /></div>
  <div>
    <div class="mb-3">{{ count }}</div>
    <div class="mb-3"><InputNumber size="small" showButtons type="number" v-model="count" /></div>
    <div class="mb-3">
      <Button size="small" @click="increment" label="Increment" severity="info" class="mr-3" icon="pi pi-check" iconPos="right" />
      <Button size="small" @click="count--" label="Decrement" icon="pi pi-times" iconPos="right" />
    </div>
  </div>
</template>

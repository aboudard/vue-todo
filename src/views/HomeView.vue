<script setup lang="ts">
import axios from 'axios'
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
const getHello = async () => {
  const { data } = await axios.get('/api/hello')
  console.log(data)
}
const postHello = async () => {
  const { data } = await axios.post('/api/pouf', { message: 'Hello from Vue 3' })
  console.log(data)
}
</script>
<template>
  <h2>{{ title?.toUpperCase() || 'Default' }}</h2>
  <div class="mb-3"><InputText size="small" readonly v-model="countString" /></div>
  <div>
    <div class="mb-3">{{ count }}</div>
    <div class="mb-3"><InputNumber size="small" showButtons type="number" v-model="count" /></div>
    <div class="mb-3">
      <Button
        size="small"
        @click="increment"
        label="Increment"
        severity="info"
        class="mr-3"
        icon="pi pi-check"
        iconPos="right"
      />
      <Button
        size="small"
        @click="count--"
        label="Decrement"
        icon="pi pi-times"
        iconPos="right"
        class="mr-3"
      />
      <Button
        size="small"
        @click="getHello"
        label="Get Hello"
        icon="pi pi-eye"
        iconPos="right"
        severity="help"
        class="mr-3"
      />
      <Button
        size="small"
        @click="postHello"
        label="Post Hello"
        icon="pi pi-send"
        iconPos="right"
        severity="success"
      />
    </div>
  </div>
</template>

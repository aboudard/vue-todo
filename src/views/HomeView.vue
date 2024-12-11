<script setup lang="ts">
import { ref } from 'vue'
import Button from "primevue/button"
import InputText from 'primevue/inputtext';
const count = ref(0);
const title = ref('Vue Home Page');
</script>

<template>
  <div class="home">
    <h2>{{ title?.toUpperCase() || 'Default' }}</h2>
    <div class="mb-3">{{ count }}</div>
    <div class="mb-3"><InputText type="number" v-model="count" /></div>
    <div class="mb-3">
      <Button @click="count++" label="Increment" severity="info" class="mr-3" />
      <Button @click="count--" label="Decrement" />
    </div>
  </div>
</template>

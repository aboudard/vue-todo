<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0);
const title = ref('Vue Home Page');
</script>

<template>
  <div class="home">
    <h1>{{ title?.toUpperCase() || 'Default' }}</h1>
    <div>{{ count }}</div>
    <div><input v-model="count" /></div>
    <div>
      <button @click="count++">Increment+</button>
      <button @click="count--">Decrement-</button>
    </div>
  </div>
</template>

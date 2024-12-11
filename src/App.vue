<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuView from './components/MenuView.vue'
</script>

<template>
  <header>
    <MenuView />
  </header>
  <RouterView />
</template>

<style scoped></style>

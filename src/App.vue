<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import MenuView from './components/MenuView.vue'
import { useTodosStore } from './stores/todos.store'
const store = useTodosStore()
onMounted(async () => {
  store.fetchTodos()
  // const response = await axios.get<Todo[]>('http://localhost:3001/todos')
  // todos.value = response.data
})
</script>

<template>
  <header>
    <MenuView />
  </header>
  <RouterView />
</template>

<style scoped></style>

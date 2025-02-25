<template>
  <div>
    <h1>Todo List</h1>
    <div>
      <button v-on:click="callMe()">OK</button>
    </div>
    <ul>
      <li v-for="todo in todosList" :key="todo.id">
        <input type="checkbox" :checked="todo.completed" />
        <span>{{ todo.title }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { computed, onMounted } from 'vue'
export interface Todo {
  id: number
  title: string
  completed: boolean
}
const store = useTodosStore()
/* const todos = ref<Todo[]>([
  {
    id: 1,
    title: 'Todo 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    completed: true,
  },
]); */

const todosList = computed(() => store.todos)

const callMe = () => {
  console.log('Hello')
}

onMounted(async () => {
  store.fetchTodos()
  // const response = await axios.get<Todo[]>('http://localhost:3001/todos')
  // todos.value = response.data
})
</script>

<style scoped></style>

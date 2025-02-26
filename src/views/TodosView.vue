<script setup lang="ts">
import { useTodosStore } from '@/stores/todos.store'
import { Button, Checkbox, Column, DataTable } from 'primevue'
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
<template>
  <div>
    <h1>Todo List</h1>
    <div>
      <Button size="small" label="count" v-on:click="callMe()" />
    </div>
    <DataTable selectionMode="single" :value="todosList" :paginator="true" :rows="5">
      <Column field="id" header="ID"></Column>
      <Column field="title" header="Title"></Column>
      <Column field="completed" header="Completed">
        <template #body="slotProps">
          <Checkbox v-model="slotProps.data.completed" binary />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<style scoped></style>

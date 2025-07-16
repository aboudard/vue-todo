<script setup lang="ts">
import { useTodosStore } from '@/stores/todos.store'
import { Button, Checkbox, Column, ConfirmDialog, DataTable, Toast, useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted } from 'vue'
export interface Todo {
  id: string
  title: string
  completed: boolean
}
const store = useTodosStore()
const toast = useToast()
const confirm = useConfirm()

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
  setTodoCompleted()
}

const setTodoCompleted = () => {
  store.setTodoCompleted('1')
}

const deleteTodo = async (id: string) => {
  confirm.require({
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    message: 'Are you sure you want to delete this todo?',
    rejectProps: {
      label: 'Cancel',
      icon: 'pi pi-times',
      severity: 'secondary',
    },
    acceptProps: {
      label: 'Delete',
      icon: 'pi pi-trash',
      severity: 'danger',
    },
    accept: async () => {
      await store.deleteTodo(id)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Todo deleted successfully',
        life: 2500,
      })
    },
    reject: () => {
      toast.add({
        severity: 'warn',
        summary: 'Cancelled',
        detail: 'Todo deletion cancelled',
        life: 2500,
      })
    },
  })
}

onMounted(async () => {
  // store.fetchTodos()
  // const response = await axios.get<Todo[]>('http://localhost:3001/todos')
  // todos.value = response.data
})
</script>
<template>
  <Toast />
  <ConfirmDialog />
  <div class="p-3">
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
      <Column header="Actions">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger"
            @click.prevent="deleteTodo(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<style scoped></style>

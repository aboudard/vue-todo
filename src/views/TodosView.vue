<script setup lang="ts">
import { useTodosStore } from '@/stores/todos.store'
import { Badge, Button, Checkbox, Column, DataTable, Toast, useConfirm } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useTodosStore()
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const todosList = computed(() => store.todos)

const callMe = () => {
  console.log('Hello')
  setTodoCompleted()
}

const setTodoCompleted = () => {
  store.setTodoCompleted('1')
}

const addHour = (id: string) => {
  store.addHour(id)
}

const viewTodo = (id: string) => {
  router.push(`/todos/${id}`)
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
  await store.fetchTodos()
})
</script>
<template>
  <div>
    <Toast />
    <div class="p-3">
      <h1>Todo List</h1>
      <p>Total Hours: <Badge :value="store.totalHours" /></p>
      <div>
        <Button size="small" label="count" v-on:click="callMe()" />
      </div>
      <DataTable selectionMode="single" :value="todosList" :paginator="true" :rows="5">
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Title">
          <template #body="slotProps">
            <Button
              :label="slotProps.data.title"
              link
              class="p-0 text-left"
              @click="viewTodo(slotProps.data.id)"
            />
          </template>
        </Column>
        <Column field="completed" header="Completed">
          <template #body="slotProps">
            <Checkbox v-model="slotProps.data.completed" binary />
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                icon="pi pi-eye"
                class="p-button-rounded p-button-info"
                v-tooltip="'View Details'"
                @click="viewTodo(slotProps.data.id)"
              />
              <Button
                icon="pi pi-plus"
                class="p-button-rounded p-button-success"
                v-tooltip="'Add Hour'"
                @click="addHour(slotProps.data.id)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger"
                v-tooltip="'Delete'"
                @click.prevent="deleteTodo(slotProps.data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

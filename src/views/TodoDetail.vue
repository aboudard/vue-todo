<script setup lang="ts">
import { useTodosStore } from '@/stores/todos.store'
import { Badge, Button, Card, Checkbox, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useTodosStore()
const toast = useToast()

const todoId = computed(() => route.params.id as string)

const todo = computed(() => {
  return store.todos.find((t) => t.id === todoId.value)
})

const toggleCompleted = () => {
  if (todo.value) {
    store.setTodoCompleted(todo.value.id!)
    toast.add({
      severity: 'success',
      summary: 'Updated',
      detail: `Todo marked as ${todo.value.completed ? 'incomplete' : 'complete'}`,
      life: 2500,
    })
  }
}

const addHour = () => {
  if (todo.value) {
    store.addHour(todo.value.id!)
    toast.add({
      severity: 'info',
      summary: 'Hour Added',
      detail: 'Added 1 hour to this todo',
      life: 2500,
    })
  }
}

const goBack = () => {
  router.push('/todos')
}

onMounted(async () => {
  // Fetch todos if not already loaded
  if (store.todos.length === 0) {
    await store.fetchTodos()
  }

  // If the specific todo is still not found, try to fetch it individually
  if (!todo.value && todoId.value) {
    try {
      await store.fetchTodoById(todoId.value)
    } catch (error) {
      console.error('Failed to fetch todo:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load todo details',
        life: 3000,
      })
    }
  }
})
</script>

<template>
  <div>
    <Toast />
    <div class="p-6">
      <div class="mb-4">
        <Button
          icon="pi pi-arrow-left"
          label="Back to Todos"
          severity="secondary"
          @click="goBack"
        />
      </div>

      <div v-if="todo">
        <Card>
          <template #title>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-bold">{{ todo.title }}</h1>
              <Badge
                :value="todo.completed ? 'Completed' : 'Pending'"
                :severity="todo.completed ? 'success' : 'info'"
              />
            </div>
          </template>

          <template #content>
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <Checkbox
                  id="completed-checkbox"
                  v-model="todo.completed"
                  binary
                  @change="toggleCompleted"
                />
                <label for="completed-checkbox" class="text-lg">
                  {{ todo.completed ? 'Completed' : 'Mark as completed' }}
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                  <h3 class="font-semibold text-lg mb-2">Details</h3>
                  <div class="space-y-2">
                    <p><strong>ID:</strong> {{ todo.id }}</p>
                    <p><strong>Hours Spent:</strong> {{ todo.hours || 0 }}</p>
                    <p v-if="todo.username"><strong>Username:</strong> {{ todo.username }}</p>
                    <p v-if="todo.dueDate">
                      <strong>Due Date:</strong> {{ new Date(todo.dueDate).toLocaleDateString() }}
                    </p>
                  </div>
                </div>

                <div v-if="todo.data" class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                  <h3 class="font-semibold text-lg mb-2">Additional Data</h3>
                  <div class="space-y-2">
                    <p><strong>Value:</strong> {{ todo.data.val }}</p>
                    <p><strong>Code:</strong> {{ todo.data.code }}</p>
                  </div>
                </div>
              </div>

              <div
                v-if="todo.categories && todo.categories.length > 0"
                class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg"
              >
                <h3 class="font-semibold text-lg mb-2">Categories</h3>
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="category in todo.categories"
                    :key="category.key"
                    :value="category.name"
                    severity="info"
                  />
                </div>
              </div>

              <div v-if="todo.category" class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                <h3 class="font-semibold text-lg mb-2">Primary Category</h3>
                <Badge :value="todo.category" severity="warning" />
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex gap-2">
              <Button icon="pi pi-plus" label="Add Hour" severity="info" @click="addHour" />
              <Button
                icon="pi pi-pencil"
                label="Edit"
                severity="warn"
                @click="router.push(`/todo-form?id=${todo.id}`)"
              />
            </div>
          </template>
        </Card>
      </div>

      <div v-else class="text-center p-8">
        <h2 class="text-xl text-muted-color">Todo not found</h2>
        <p class="mt-2">The todo with ID "{{ todoId }}" does not exist.</p>
        <Button label="Go to Todos" class="mt-4" @click="goBack" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>

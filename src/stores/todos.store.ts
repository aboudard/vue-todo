import type { Todo } from '@/models/todo'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

export const useTodosStore = defineStore('todostore', () => {
  const todos = ref<Todo[]>([])

  const todosCount = computed(() => todos.value.length)
  const completedTodosCount = computed(() => todos.value.filter((todo) => todo.completed).length)
  const totalHours = computed(() => todos.value.reduce((sum, todo) => sum + (todo.hours || 0), 0))

  async function fetchTodos() {
    try {
      const response = await axios.get<Todo[]>('http://localhost:3001/todos')
      todos.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  watchEffect(() => {
    // when a todo is updated, we call the server with patch
    console.log(todos.value.length)
  })

  function setTodoCompleted(id: string) {
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
  }

  function addHour(id: string) {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      todo.hours = (todo.hours || 0) + 1
    }
  }

  async function addTodo(todo: Partial<Todo>) {
    try {
      const todoNew = await axios.post('http://localhost:3001/todos', todo)
      todos.value = [...todos.value, todoNew.data]
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteTodo(id: string) {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`)
      todos.value = todos.value.filter((todo) => todo.id !== id)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    addHour,
    todos,
    todosCount,
    completedTodosCount,
    totalHours,
    fetchTodos,
    addTodo,
    setTodoCompleted,
    deleteTodo,
  }
})

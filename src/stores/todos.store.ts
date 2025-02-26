import type { Todo } from '@/views/TodosView.vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface TodoState {
  todos: Todo[]
}

export const useTodosStore = defineStore('todost', {
  state: () => ({
    todos: [] as Todo[],
  }),
  getters: {
    todosCount: (state: TodoState) => state.todos.length,
    completedTodosCount: (state: TodoState) => state.todos.filter((todo) => todo.completed).length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get<Todo[]>('http://localhost:3001/todos')
        this.todos = response.data
      } catch (error) {
        console.error(error)
      }
    },
    setTodoCompleted(id: number) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  },
})

import { defineStore } from "pinia";
import axios from 'axios';
import type { Todo } from "@/views/TodosView.vue";

export const useTodosStore = defineStore('todost', {
  state: () => ({
    todos: [] as Todo[]
  }),
  getters: {
    getTodos(state) {
      return state.todos
    }
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get<Todo[]>('http://localhost:3001/todos');
        this.todos = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
})

import type { Todo } from '@/models/todo'

// Mock data for development/testing without json-server
export const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Learn Vue 3 Composition API',
    username: 'john_doe',
    completed: true,
    awesome: true,
    trulyAwesome: true,
    hours: 5,
    data: {
      val: 'high',
      code: 1,
    },
    categories: [
      { key: 'dev', name: 'Development' },
      { key: 'learn', name: 'Learning' },
    ],
    category: 'dev',
    color: 'blue',
  },
  {
    id: '2',
    title: 'Build Todo Application',
    username: 'jane_smith',
    completed: false,
    awesome: true,
    trulyAwesome: false,
    hours: 10,
    data: {
      val: 'medium',
      code: 2,
    },
    categories: [{ key: 'dev', name: 'Development' }],
    category: 'dev',
    color: 'green',
  },
  {
    id: '3',
    title: 'Write Unit Tests',
    username: 'john_doe',
    completed: false,
    awesome: false,
    trulyAwesome: false,
    hours: 3,
    data: {
      val: 'low',
      code: 3,
    },
    categories: [
      { key: 'test', name: 'Testing' },
      { key: 'dev', name: 'Development' },
    ],
    category: 'test',
    color: 'red',
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API functions
export const mockApi = {
  async fetchTodos(): Promise<Todo[]> {
    await delay(300) // Simulate network delay
    return [...mockTodos]
  },

  async fetchTodoById(id: string): Promise<Todo> {
    await delay(200)
    const todo = mockTodos.find((t) => t.id === id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }
    return { ...todo }
  },

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await delay(250)
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: todo.title || 'Untitled',
      completed: false,
      hours: 0,
      data: todo.data || { val: '', code: 0 },
      categories: todo.categories || [],
      category: todo.category || '',
      color: todo.color || 'gray',
      ...todo,
    }
    mockTodos.push(newTodo)
    return { ...newTodo }
  },

  async deleteTodo(id: string): Promise<void> {
    await delay(200)
    const index = mockTodos.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`)
    }
    mockTodos.splice(index, 1)
  },

  async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    await delay(250)
    const index = mockTodos.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`)
    }
    mockTodos[index] = { ...mockTodos[index], ...updates }
    return { ...mockTodos[index] }
  },
}

import axios from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTodosStore } from './todos.store'

vi.mock('axios')

describe('useTodosStore - fetchTodos', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches todos and updates the store', async () => {
    const mockTodos = [
      { id: '1', title: 'Test 1', completed: false },
      { id: '2', title: 'Test 2', completed: true },
    ]
    // @ts-expect-error: mockResolvedValue is not typed on axios.get in TypeScript
    axios.get.mockResolvedValue({ data: mockTodos })

    const store = useTodosStore()
    await store.fetchTodos()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/todos')
    expect(store.todos).toEqual(mockTodos)
  })

  it('handles fetch error gracefully', async () => {
    const error = new Error('Network error')
    // @ts-expect-error: mockRejectedValue is not typed on axios.get in TypeScript
    axios.get.mockRejectedValue(error)
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const store = useTodosStore()
    await store.fetchTodos()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/todos')
    expect(consoleErrorSpy).toHaveBeenCalledWith(error)
    expect(store.todos).toEqual([])
    consoleErrorSpy.mockRestore()
  })

  it('adds a todo and updates the store', async () => {
    const initialTodos = [
      {
        id: '1',
        title: 'Test 1',
        completed: false,
        data: { val: '', code: 0 },
        categories: [],
        category: '',
        color: '#000000',
      },
    ]
    const newTodo = {
      title: 'New Todo',
      completed: false,
      data: { val: '', code: 0 },
      categories: [],
      category: '',
      color: '#000000',
    }
    const createdTodo = {
      id: '2',
      title: 'New Todo',
      completed: false,
      data: { val: '', code: 0 },
      categories: [],
      category: '',
      color: '#000000',
    }
    // @ts-expect-error: mockResolvedValue is not typed on axios.post in TypeScript
    axios.post.mockResolvedValue({ data: createdTodo })

    const store = useTodosStore()
    store.todos = [...initialTodos]

    await store.addTodo(newTodo)

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/todos', newTodo)
    expect(store.todos).toEqual([...initialTodos, createdTodo])
  })

  it('handles addTodo error gracefully', async () => {
    const error = new Error('Add failed')
    // @ts-expect-error: mockRejectedValue is not typed on axios.post in TypeScript
    axios.post.mockRejectedValue(error)
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const store = useTodosStore()
    store.todos = []

    await store.addTodo({ title: 'Should Fail' })

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/todos', { title: 'Should Fail' })
    expect(consoleErrorSpy).toHaveBeenCalledWith(error)
    expect(store.todos).toEqual([])
    consoleErrorSpy.mockRestore()
  })
})

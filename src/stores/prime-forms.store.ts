import type { Prime } from '@/models/prime'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePrimeFormsStore = defineStore('primeformsstore', () => {
  const prime = ref<Prime>({
    dataForm: { username: 'zzz', lastname: 'zzz', completed: false, ready: false },
  })
  const setPrime = (data: Prime) => {
    prime.value = data
  }
  const loadPrime = async (data: Prime): Promise<void> => {
    // Simulate an async operation, e.g., fetching data from an API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        prime.value = data
        resolve()
      }, 1000)
    })
  }
  return {
    prime,
    setPrime,
    loadPrime,
  }
})

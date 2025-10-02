import type { Option } from "./option"

export interface Todo {
  id?: string
  title: string
  completed: boolean
  awesome?: boolean
  trulyAwesome?: boolean
  dueDate?: Date // Optional property for due date
  hours?: number // Optional property for hours spent on the todo
  data: {
    val: string
    code: number
  }
  categories: Option[]
  category: string
}

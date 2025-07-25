<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { useTodosStore } from '@/stores/todos.store'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Button, Checkbox, InputText, Message, Toast } from 'primevue'
import DatePicker from 'primevue/datepicker'
import { useToast } from 'primevue/usetoast'
import { ref, useTemplateRef } from 'vue'
import { z } from 'zod'
import type { Todo } from './TodosView.vue'

const toast = useToast()
const store = useTodosStore()
const todoForm = useTemplateRef('todoForm')

const categories = ref([
  { name: 'Accounting', key: 'A' },
  { name: 'Marketing', key: 'M' },
  { name: 'Production', key: 'P' },
  { name: 'Research', key: 'R' },
])
const selectedCategories = ref(['M'])

const initialValues = ref<Todo>({
  title: '',
  dueDate: new Date(),
  data: {
    val: 'empty',
    code: 54,
  },
  hours: 12,
  completed: false,
  categories: ['M'],
})

const resolver = ref(
  zodResolver(
    z.object({
      title: z.string().min(1, { message: 'Title is required via Zod.' }),
      dueDate: z.date().min(new Date(), { message: 'Due date must be in the future.' }),
      hours: z.number().min(0, { message: 'Hours must be a positive number.' }),
      completed: z.literal(true),
    }),
  ),
)

/* const resolver = ({ values }: { values: { title: string; dueDate: Date } }) => {
  const errors: Record<string, Array<{ message: string }>> = {};

    if (!values.title) {
        errors.title = [{ message: 'Title is required.' }];
    }
    if (!values.dueDate) {
        errors.dueDate = [{ message: 'Due date is required.' }];
    }
    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
} */

const onFormSubmit = async (e: FormSubmitEvent) => {
  /* axios.post('http://localhost:3001/todos', {
    title: e.values.title,
    completed: true,
  }); */

  await store.addTodo({
    title: e.values.title,
    completed: true,
  })
  toast.add({
    severity: 'success',
    summary: `Form is submitted with ${e.values.title}`,
    life: 3000,
  })
  // Reset form
  initialValues.value.title = ''
  initialValues.value.dueDate = new Date()
}
</script>
<template>
  <Toast />
  <div class="p-3">
    <div>
      <h1>Todo Form</h1>
    </div>
    <div class="flex-row flex justify-center gap-4">
      <Form
        ref="todoForm"
        v-slot="$form"
        :resolver
        :initialValues
        @submit="onFormSubmit"
        class="basis-1/3 flex flex-col gap-4 w-full sm:w-56"
      >
        <div class="flex flex-col gap-1">
          <InputText
            v-model="initialValues.title"
            name="title"
            type="text"
            placeholder="title"
            fluid
          />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
            $form.title.error?.message
          }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <DatePicker v-model="initialValues.dueDate" name="dueDate" placeholder="Due Date" fluid />
          <Message v-if="$form.dueDate?.invalid" severity="error" size="small" variant="simple">{{
            $form.dueDate.error?.message
          }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <BaseInput
            v-model:completed="initialValues.completed"
            v-model:hours="initialValues.hours"
          />
          <Message v-if="$form.completed?.invalid" severity="error" size="small" variant="simple">{{
            $form.completed.error?.message
          }}</Message>
          <Message v-if="$form.hours?.invalid" severity="error" size="small" variant="simple">{{
            $form.hours.error?.message
          }}</Message>
        </div>
        <div class="flex flex-col gap-4">
          <div v-for="category of categories" :key="category.key" class="flex items-center gap-2">
            <Checkbox
              v-model="selectedCategories"
              :inputId="category.key"
              name="category"
              :value="category.key"
            />
            <label :for="category.key">{{ category.name }}</label>
          </div>
        </div>
        <div>
          {{ $form.data }}
        </div>
        <Button type="submit" :disabled="!$form.valid" severity="info" label="Submit" />
      </Form>

      <div class="basis-2/3 p-4 border border-gray-300 rounded-md">
        <div>Initial Values :</div>
        <div>{{ initialValues }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import ArraysInput from '@/components/ArraysInput.vue'
import BaseInput from '@/components/BaseInput.vue'
import type { Todo } from '@/models/todo'
import { useTodosStore } from '@/stores/todos.store'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Button, ColorPicker, InputText, Message, Toast, ToggleSwitch } from 'primevue'
import DatePicker from 'primevue/datepicker'
import { useToast } from 'primevue/usetoast'
import { reactive, ref, useTemplateRef, watchEffect } from 'vue'
import { z } from 'zod'

const toast = useToast()
const store = useTodosStore()
const todoForm = useTemplateRef('todoForm')

const categories = ref([
  { name: 'Accounting', key: 'A' },
  { name: 'Marketing', key: 'M' },
  { name: 'Production', key: 'P' },
  { name: 'Research', key: 'R' },
])

const logChange = (value: any) => {
  console.log('ToggleSwitch changed to:', value)
}

const initialValues = reactive<Todo>({
  title: 'qsqs',
  username: 'alain',
  dueDate: new Date(),
  data: {
    val: 'empty',
    code: 54,
  },
  hours: 6,
  completed: false,
  trulyAwesome: false,
  awesome: true,
  categories: [],
  category: '',
  color: '#cccccc',
})

// const trulyAwesome = computed(() => initialValues.value.awesome && initialValues.value.completed)

watchEffect(() => {
  // listen only to initialValues.awesome changes and completed
  console.log('Awesome changed to:', initialValues.awesome)
  console.log('Completed changed to:', initialValues.completed)
  initialValues.trulyAwesome = initialValues.awesome && initialValues.completed
})

const resolver = ref(
  zodResolver(
    z.object({
      title: z.string().min(1, { message: 'Title is required via Zod.' }),
      dueDate: z.date().min(new Date(), { message: 'Due date must be in the future.' }),
      hours: z.number().min(0, { message: 'Hours must be a positive number.' }),
      completed: z.literal(true, { errorMap: () => ({ message: "Completed must be true." }), }),
      categories: z
        .array(z.string())
        .min(1, { message: 'At least one category must be selected.' }),
      category: z.string().min(1, { message: 'A category must be selected.' }),
      username: z.string().min(1, { message: 'Username is required.' }),
      color: z.string().min(1, { message: 'Color is required.' }),
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

  if (!e.valid) {
    toast.add({
      severity: 'error',
      summary: 'Form has errors. Please fix them before submitting.',
      life: 3000,
    })
    return
  }

  console.log('Form Submitted with values:', e.values)

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
  initialValues.title = ''
  initialValues.dueDate = new Date()
}
</script>
<template>
  <div>
    <Toast />
    <div class="p-3 flex flex-col gap-3 justify-center">
      <div>
        <h1>Todo Form</h1>
      </div>
      <div class="flex-row flex justify-center gap-4">
        <Form
          ref="todoForm"
          v-slot="$form"
          :initialValues
          :resolver
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
            <DatePicker
              dataType="string"
              updateModelType="date"
              dateFormat="dd/mm/yy"
              v-model="initialValues.dueDate"
              name="dueDate"
              placeholder="Due Date"
              fluid
            />
            <Message v-if="$form.dueDate?.invalid" severity="error" size="small" variant="simple">{{
              $form.dueDate.error?.message
            }}</Message>
          </div>
          <div class="flex flex-col gap-1">
            <ToggleSwitch
              @change="(e) => logChange(e.target?.checked)"
              v-model="initialValues.awesome"
              name="awesome"
            />
          </div>
          <div class="flex flex-col gap-1">
            <ToggleSwitch v-model="initialValues.trulyAwesome" name="trulyAwesome" />
          </div>
          <div class="flex flex-col gap-1">
            <BaseInput
              v-model:completed="initialValues.completed"
              v-model:hours="initialValues.hours"
            />
            <Message
              v-if="$form.completed?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.completed.error?.message }}</Message
            >
            <Message v-if="$form.hours?.invalid" severity="error" size="small" variant="simple">{{
              $form.hours.error?.message
            }}</Message>
          </div>
          <div class="flex flex-col gap-4">
            <ArraysInput
              :items="categories"
              v-model:selectedItem="initialValues.category"
              v-model:selectedItems="initialValues.categories"
            />
            <Message
              v-if="$form.categories?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.categories.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-4">
            <label for="colorPicker">Select Color:</label>
            <ColorPicker id="colorPicker" v-model="initialValues.color" name="color" />
          </div>
          <div>
            <FormField v-slot="$field" name="username" class="flex flex-col gap-1">
              <input
                type="text"
                v-model="initialValues.username"
                placeholder="Username"
                :class="[{ error: $field?.invalid }]"
                v-bind="$field.props"
              />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                $field.error?.message
              }}</Message>
            </FormField>
          </div>
          <Button type="submit" :disabled="!$form.valid" severity="info" label="Submit" />
        </Form>
        <div class="basis-2/3 p-4 border border-gray-300 rounded-md">
          <div>Initial Values :</div>
          <div>{{ initialValues }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

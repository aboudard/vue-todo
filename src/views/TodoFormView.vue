<script setup lang="ts">
import { useTodosStore } from '@/stores/todos.store'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Button, InputText, Message, Toast } from 'primevue'
import DatePicker from 'primevue/datepicker'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { z } from 'zod'

const toast = useToast()
const store = useTodosStore()

const initialValues = ref({
  title: '',
  dueDate: new Date(),
})

const resolver = ref(
  zodResolver(
    z.object({
      title: z.string().min(1, { message: 'Title is required via Zod.' }),
      dueDate: z.date().min(new Date(), { message: 'Due date must be in the future.' }),
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
    <div class="card flex justify-center">
      <Form
        v-slot="$form"
        :resolver
        :initialValues
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full sm:w-56"
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
        <Button type="submit" :disabled="!$form.valid" severity="info" label="Submit" />
      </Form>
    </div>
  </div>
</template>
<style scoped></style>

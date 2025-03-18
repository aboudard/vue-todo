<script setup lang="ts">
import { useTodosStore } from '@/stores/todos.store'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { Button, InputText, Message, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { reactive } from 'vue'

const toast = useToast()
const store = useTodosStore()

const initialValues = reactive({
  title: '',
})

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
}
</script>
<template>
  <div>
    <h1>Todo Form</h1>
  </div>
  <div class="card flex justify-center">
    <Toast />

    <Form
      v-slot="$form"
      :initialValues
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <InputText name="title" type="text" placeholder="title" fluid />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
          $form.title.error?.message
        }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
<style scoped></style>

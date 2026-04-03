<script setup lang="ts">
import type { Prime } from '@/features/prime-forms/models/prime'
import { usePrimeFormsStore } from '@/features/prime-forms/stores/prime-forms.store'
import { Form, type FormInstance, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Button, InputText, ToggleSwitch } from 'primevue'
import { onBeforeMount, onMounted, ref, useTemplateRef } from 'vue'
import * as zod from 'zod'

const primeFormsStore = usePrimeFormsStore()
const refForm = useTemplateRef<FormInstance>('refForm')
const initialValues = ref<Prime>({
  username: 'zzz',
  lastname: 'zzz',
  age: 20,
  completed: false,
  ready: false,
})
const onFormSubmit = (formSubmitEvent: FormSubmitEvent) => {
  if (formSubmitEvent.valid) {
    console.log('Form submitted with values:', formSubmitEvent.values)
    console.log('Initial Values:', initialValues.value)
  }
}
const resolver = zodResolver(
  zod.object({
    username: zod.string().min(1, { message: 'Username is required.' }),
    lastname: zod.string().min(1, { message: 'Lastname is required.' }),
    // either number or string that can be parsed to number
    age: zod.coerce.number().min(0, { message: 'Age must be a positive number.' }),
  }),
)

onBeforeMount(() => {
  /* primeFormsStore.setPrime({
    dataForm: { username: 'MJ', lastname: 'Jackson', completed: false, ready: true },
  }) */
})
onMounted(() => {
  console.log('Mounted - Store Prime:', primeFormsStore.prime)
})
/* onBeforeMount(async () => {
  await primeFormsStore.loadPrime({
    username: 'MJ',
    lastname: 'Jackson',
    completed: false,
    ready: true,
  })
})
 */
const setReady = (value: boolean) => {
  if (refForm.value) {
    refForm.value.setFieldValue('ready', value)
  }
}
</script>

<template>
  <div class="p-3">
    <h1>PrimeVue Forms Example</h1>
    <div class="card flex justify-center gap-3">
      <Form ref="refForm" v-slot="$form" :resolver :initialValues @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full sm:w-80">
        <div class="flex flex-col gap-1">
          <InputText name="username" type="text" placeholder="Username" fluid />
        </div>
        <div class="flex flex-col gap-1">
          <InputText name="lastname" type="text" placeholder="Lastname" fluid />
        </div>
        <div class="flex flex-col gap-1">
          <InputText name="age" type="number" placeholder="Age" fluid />
        </div>
        <div class="flex flex-col gap-1">
          Completed
          <ToggleSwitch name="completed" @change="(e: Event) => setReady((e.target as HTMLInputElement)?.checked)" />
        </div>
        <div class="flex flex-col gap-1">
          Ready
          <ToggleSwitch name="ready" />
        </div>
        <Button :disabled="!$form.valid" type="submit" severity="success" label="Submit" />
      </Form>

      <div class="p-4 border border-gray-300 rounded-md">
        <div>Initial Values :</div>
        <div>{{ initialValues }}</div>
      </div>

      <div class="p-4 border border-gray-300 rounded-md">
        <div>Store :</div>
        <div>{{ primeFormsStore.prime }}</div>
      </div>
    </div>
  </div>
</template>

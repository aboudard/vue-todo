<script setup lang="ts">
import type { Prime } from '@/models/prime'
import { usePrimeFormsStore } from '@/stores/prime-forms.store'
import { Form, type FormInstance, type FormSubmitEvent } from '@primevue/forms'
import { Button, InputText, ToggleSwitch } from 'primevue'
import { onBeforeMount, ref, useTemplateRef } from 'vue'

const primeFormsStore = usePrimeFormsStore()
const refForm = useTemplateRef<FormInstance>('refForm')
const initialValues = ref<Prime>({
  dataForm: { username: 'zzz', lastname: 'zzz', completed: false, ready: false },
})
const onFormSubmit = (formSubmitEvent: FormSubmitEvent) => {
  if (formSubmitEvent.valid) {
    console.log('Form submitted with values:', formSubmitEvent.values)
    console.log('Initial Values:', initialValues.value)
  }
}
onBeforeMount(() => {
  primeFormsStore.setPrime({
    dataForm: { username: 'MJ', lastname: 'Jackson', completed: false, ready: true },
  })
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
      <Form
        ref="refForm"
        v-slot="$form"
        :initialValues="primeFormsStore.prime"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full sm:w-80"
      >
        <div class="flex flex-col gap-1">
          <InputText name="dataForm.username" type="text" placeholder="Username" fluid />
        </div>
        <div class="flex flex-col gap-1">
          <InputText name="dataForm.lastname" type="text" placeholder="Lastname" fluid />
        </div>
        <div class="flex flex-col gap-1">
          <ToggleSwitch
            name="dataForm.completed"
            @change="(e: Event) => setReady((e.target as HTMLInputElement)?.checked)"
          />
        </div>
        <div class="flex flex-col gap-1">
          <ToggleSwitch name="dataForm.ready" />
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

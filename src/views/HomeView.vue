<script setup lang="ts">
import { useCustomConfirm } from '@/composables/confirm-custom'
import axios from 'axios'
import { InputNumber, Panel, Toast, ToggleSwitch, useToast } from 'primevue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'

// const customConfirm = useCustomConfirm()
const customConfirm = useCustomConfirm()
const toast = useToast()
const count = ref(0)
const checked = ref(false)
const countString = computed({
  get: () => count.value.toString(),
  set: (val: string) => (count.value = parseInt(val)),
})
const title = ref('Counter with local ref')
const increment = () => count.value++
const getHello = async () => {
  const { data } = await axios.get('/api/hello')
  console.log(data)
}
const postHello = async () => {
  const { data } = await axios.post('/api/hello', { message: 'Hello from Vue 3' })
  console.log(data)
}
const showToast = (severity: string, summary: string, detail: string) => {
  toast.add({ severity, summary, detail, life: 0 })
}
const showCustomConfirm = () => {
  customConfirm.showCustomConfirm({})
}
</script>
<template>
  <div class="p-3">
    <h2>{{ title?.toUpperCase() || 'Default' }}</h2>
    <div class="mb-3"><InputText size="small" readonly v-model="countString" /></div>
    <div class="card flex justify-center">
      <ToggleSwitch v-model="checked" />
    </div>
    <div>
      <div class="mb-3 text-white">{{ count }}</div>
      <div class="mb-3"><InputNumber size="small" showButtons type="number" v-model="count" /></div>
      <Panel header="Toasts" class="mb-3">
        <div class="mb-3">
          <Button
            size="small"
            @click="showToast('info', 'Info', 'This is an info message')"
            label="Show Info Toast"
            icon="pi pi-info-circle"
            iconPos="right"
            severity="info"
            class="mr-3"
          />
          <Button
            size="small"
            @click="showToast('success', 'Success', 'This is a success message')"
            label="Show Success Toast"
            icon="pi pi-check-circle"
            iconPos="right"
            severity="success"
            class="mr-3"
          />
          <Button
            size="small"
            @click="showToast('warn', 'Warning', 'This is a warning message')"
            label="Show Warning Toast"
            icon="pi pi-exclamation-triangle"
            iconPos="right"
            severity="warn"
            class="mr-3"
          />
          <Button
            size="small"
            @click="showToast('error', 'Error', 'This is an error message')"
            label="Show Error Toast"
            icon="pi pi-times-circle"
            iconPos="right"
            severity="error"
            class="mr-3"
          />
          <Button
            size="small"
            @click="showToast('secondary', 'Success', 'This is a secondary message')"
            label="Show Secondary Toast"
            icon="pi pi-check-circle"
            iconPos="right"
            severity="secondary"
            class="mr-3"
          />
          <Button
            size="small"
            @click="showToast('contrast', 'Contrast', 'This is a contrast message')"
            label="Show Contrast Toast"
            icon="pi pi-question-circle"
            iconPos="right"
            severity="contrast"
            class="mr-3"
          />
        </div>
      </Panel>
      <Panel header="Buttons" class="mb-3">
        <div class="mb-3">
          <Button
            size="small"
            label="Secondary"
            severity="secondary"
            class="mr-3"
            icon="pi pi-check"
            iconPos="right"
          />
          <Button
            size="small"
            @click="increment"
            label="Increment"
            severity="info"
            class="mr-3"
            icon="pi pi-check"
            iconPos="right"
          />
          <Button
            size="small"
            @click="count--"
            label="Decrement"
            icon="pi pi-times"
            iconPos="right"
            class="mr-3"
          />
          <Button
            size="small"
            @click="getHello"
            label="Get Hello"
            icon="pi pi-eye"
            iconPos="right"
            severity="help"
            class="mr-3"
          />
          <Button
            size="small"
            @click="postHello"
            label="Post Hello"
            icon="pi pi-send"
            iconPos="right"
            severity="success"
          />
          <Button
            size="small"
            @click="showToast('info', 'Info', 'This is an info message')"
            label="Show Toast"
            icon="pi pi-bell"
            iconPos="right"
            severity="warning"
            class="ml-3"
          />
          <Button
            size="small"
            @click="showCustomConfirm()"
            label="Custom Confirm"
            icon="pi pi-exclamation-triangle"
            iconPos="right"
            severity="danger"
            class="ml-3"
          />
        </div>
      </Panel>
    </div>
    <div>
      <div class="bg-sky-50 p-2">50</div>
      <div class="bg-sky-100 p-2">100</div>
      <div class="bg-sky-200 p-2">200</div>
      <div class="bg-sky-300 p-2">300</div>
      <div class="bg-sky-400 p-2">400</div>
      <div class="bg-sky-500 p-2">500</div>
      <div class="bg-sky-600 p-2">600</div>
      <div class="bg-sky-700 p-2">700</div>
      <div class="bg-sky-800 p-2">800</div>
      <div class="bg-sky-900 p-2">900</div>
      <div class="bg-sky-950 p-2">950</div>
    </div>
  </div>
  <Toast />
</template>

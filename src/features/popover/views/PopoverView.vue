<script setup lang="ts">
import { Button, Popover, useConfirm } from 'primevue'
import { defineAsyncComponent, useTemplateRef } from 'vue'

const CustomPopover = defineAsyncComponent(() => import('@/features/popover/components/CustomPopover.vue'))

type PopoverToggleEvent = Event | { target?: unknown }

type PopoverToggleTarget = {
  toggle: (event: PopoverToggleEvent) => void
}

type CustomPopoverExpose = {
  togglePopover: (event: PopoverToggleEvent) => void
}

const confirm = useConfirm()
const op = useTemplateRef<PopoverToggleTarget>('op')
const customOp = useTemplateRef<CustomPopoverExpose>('customOp')

const toggle = (event: PopoverToggleEvent) => {
  console.log('Toggle popover', event)
  op.value?.toggle(event)
}
const toggleCustom = (event: PopoverToggleEvent) => {
  customOp.value?.togglePopover(event)
  console.log('Custom popover toggle logic to be implemented', event)
}
const showConfirm = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Save',
    },
    accept: () => {
      console.log('You have accepted')
    },
    reject: () => {
      console.log('You have rejected')
    },
  })
}
</script>

<template>
  <div class="p-3">
    <h2>Popover View</h2>
    <Button type="button" icon="pi pi-share-alt" label="Share" @click="toggle" />
    <Button type="button" icon="pi pi-info" severity="info" label="Info" @click="toggleCustom" />
    <Button type="button" icon="pi pi-check" severity="success" label="Confirm Action" @click="showConfirm" />
  </div>
  <Popover ref="op">
    <div class="p-3">
      <h3>Title</h3>
      <p>This is some content inside the popover.</p>
    </div>
  </Popover>
  <CustomPopover ref="customOp" labelButton="Click Me"
    @buttonAction="() => console.log('Button inside popover clicked!')" />
</template>

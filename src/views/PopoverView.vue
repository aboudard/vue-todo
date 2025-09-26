<script setup lang="ts">
import { Button, Popover } from 'primevue'
import { defineAsyncComponent, useTemplateRef } from 'vue'

const CustomPopover = defineAsyncComponent(() => import('@/components/CustomPopover.vue'))

const op = useTemplateRef('op')
const customOp = useTemplateRef('customOp')

const toggle = (event: any) => {
  console.log('Toggle popover', event)
  op.value?.toggle(event)
}
const toggleCustom = (event: any) => {
  customOp.value?.togglePopover(event)
  console.log('Custom popover toggle logic to be implemented', event)
}
</script>

<template>
  <div class="p-3">
    <h2>Popover View</h2>
    <Button type="button" icon="pi pi-share-alt" label="Share" @click="toggle" />
    <Button type="button" icon="pi pi-info" severity="info" label="Info" @click="toggleCustom" />
  </div>
  <Popover ref="op">
    <div class="p-3">
      <h3>Title</h3>
      <p>This is some content inside the popover.</p>
    </div>
  </Popover>
  <CustomPopover
    ref="customOp"
    labelButton="Click Me"
    @buttonAction="() => console.log('Button inside popover clicked!')"
  />
</template>

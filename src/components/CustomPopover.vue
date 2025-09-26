<script setup lang="ts">
import { Button, Popover } from 'primevue'
import { ref, useTemplateRef } from 'vue';

// Composition API logic can go here
interface Props {
  labelButton: string
}
const props = defineProps<Props>()
const emit = defineEmits(['buttonAction'])
const op = ref()
const togglePopover = (event: any) => {
  console.log('Toggle popover', event)
  op.value?.toggle(event)
}
defineExpose({ togglePopover });
</script>

<template>
  <!-- CustomPopover component -->
  <Popover ref="op">
    <div class="p-3">
      <h3>Title</h3>
      <p>This is some content inside the popover.</p>
      <Button @click="emit('buttonAction')">{{ props.labelButton }}</Button>
    </div>
  </Popover>
</template>

<style scoped>
/* Add component styles here */
</style>

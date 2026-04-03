<script setup lang="ts">
import { Button, Popover } from 'primevue';
import { ref } from 'vue';

// Composition API logic can go here
interface Props {
  labelButton: string
}
const props = defineProps<Props>()
const emit = defineEmits(['buttonAction'])
type PopoverToggleTarget = {
  toggle: (event: PopoverToggleEvent) => void
}

type PopoverToggleEvent = Event | { target?: unknown }

const op = ref<PopoverToggleTarget | null>(null)
const togglePopover = (event: PopoverToggleEvent) => {
  console.log('Toggle popover', event)
  op.value?.toggle(event)
}
defineExpose({ togglePopover })
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

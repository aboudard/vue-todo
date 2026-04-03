<template>
  <div>
    <div>Completed :
      <ToggleSwitch :value="completed" name="completed" @value-change="writeValue('completed', $event)" />
    </div>

    <InputNumber type="number" name="hours" :value="hours" fluid @value-change="writeValue('hours', $event)" />
  </div>
</template>
<script setup lang="ts">
import { InputNumber, ToggleSwitch } from 'primevue';

const emit = defineEmits(['update:completed', 'update:hours'])
const { hours, completed } = defineProps<{
  hours?: number
  completed: boolean
}>()

function writeValue(key: 'completed', value: boolean): void
function writeValue(key: 'hours', value: number | null): void
function writeValue(key: 'completed' | 'hours', value: boolean | number | null) {
  if (key === 'completed') {
    emit('update:completed', value as boolean)
  } else if (key === 'hours') {
    emit('update:hours', Number(value))
  }
}
</script>

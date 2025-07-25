<template>
  <div>
    <div>items: {{ items }}</div>
    <div>selectedItem: {{ selectedItem }}</div>
    <div>selectedItems: {{ selectedItems }}</div>
  </div>
  <div v-for="(category, index) of items" :key="category.key" class="flex items-center gap-2">
    <Checkbox
      :inputId="`category-${index}`"
      @value-change="writeValue('selectedItems', $event)"
      name="categories"
      :value="category"
    />
    <span>{{ category.name }}</span>
    <RadioButton
      :inputId="`selectedItem-${index}-radio`"
      @value-change="writeValue('selectedItem', $event)"
      name="category"
      :value="category.key"
    />
  </div>
</template>
<script setup lang="ts">
import type { Option } from '@/views/TodosView.vue';
import { Checkbox, RadioButton } from 'primevue'
import { ref } from 'vue';

const emit = defineEmits(['update:selectedItems', 'update:selectedItem'])
const props = defineProps<
{
  items: Option[];
  selectedItem: string;
  selectedItems: Option[];
}
>()

const selectedItems = ref<Option[]>(props.selectedItems);
const selectedItem = ref<string>(props.selectedItem);

function writeValue(key: string, value: any) {
  if (key === 'selectedItem') {
    emit('update:selectedItem', value)
  } else if (key === 'selectedItems') {
    emit('update:selectedItems', value)
  }
}
</script>

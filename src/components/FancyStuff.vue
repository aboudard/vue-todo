<template>
  <div class="border rounded bg-gray-200 p-4 mb-3">
    <template v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <slot :text="theMessage" count="12" :myCall="myCall"></slot>
    <slot name="footer">
      Empty Footer
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const theMessage = ref('Hello from FancyStuff!')
const myCall = () => {
  alert('Called from FancyStuff!')
}
</script>

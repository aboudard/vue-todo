<template>
  <div class="fancy-stuff-content">
    <div
      class="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg"
    >
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2">{{ displayText }}</h3>
        <div class="flex items-center gap-4 text-sm">
          <span class="bg-white/20 px-2 py-1 rounded"> Count: {{ count }} </span>
          <span class="bg-white/20 px-2 py-1 rounded"> Status: {{ status }} </span>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Button
          @click="handleAction"
          size="small"
          severity="secondary"
          outlined
          class="bg-white/10 border-white/30 text-white hover:bg-white/20"
        >
          {{ actionLabel }}
        </Button>

        <Button
          @click="incrementCount"
          size="small"
          severity="success"
          outlined
          class="bg-white/10 border-white/30 text-white hover:bg-white/20"
        >
          Increment
        </Button>
      </div>
    </div>

    <div class="mt-3 p-3 bg-gray-50 rounded border-l-4 border-blue-500">
      <p class="text-sm text-gray-700">
        This is the FancyStuffContent component. It receives props:
        <code class="bg-gray-200 px-1 rounded">text</code>,
        <code class="bg-gray-200 px-1 rounded">count</code>, and emits an
        <code class="bg-gray-200 px-1 rounded">@action</code> event.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import { computed, ref } from 'vue'

// Props (no longer including myCall)
interface Props {
  text?: string
  count?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Default message',
  count: 0,
})

// Events
const emit = defineEmits<{
  action: []
}>()

// Local reactive state
const internalCount = ref(Number(props.count) || 0)
const status = ref<'active' | 'idle' | 'processing'>('idle')

// Computed properties
const displayText = computed(() => {
  return props.text || 'No message provided'
})

const actionLabel = computed(() => {
  switch (status.value) {
    case 'processing':
      return 'Processing...'
    case 'active':
      return 'Active'
    default:
      return 'Activate'
  }
})

// Methods
const handleAction = () => {
  status.value = 'processing'

  // Emit the action event
  emit('action')

  // Simulate some processing
  setTimeout(() => {
    status.value = status.value === 'active' ? 'idle' : 'active'
  }, 1000)
}

const incrementCount = () => {
  internalCount.value += 1
  status.value = 'processing'

  setTimeout(() => {
    status.value = 'idle'
  }, 500)
}
</script>

<style scoped>
.fancy-stuff-content code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}
</style>

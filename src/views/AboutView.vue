<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.store'
import { Button, InputNumber } from 'primevue'
import { useI18n } from 'vue-i18n'
const counter = useCounterStore()
const { t } = useI18n()
</script>
<template>
  <div class="p-3">
    <h2 class="bg-red-100 mb-3 p-2">{{ t('about.title') }}</h2>
    <div class="mb-3">
      <InputNumber size="small" showButtons v-model="counter.count" />
    </div>
    <Button @click="counter.increment" size="small" label="Increment" />
  </div>
</template>

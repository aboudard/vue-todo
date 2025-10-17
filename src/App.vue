<script setup lang="ts">
import { ConfirmDialog, ProgressSpinner } from 'primevue'
import { onMounted, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import MenuView from './components/MenuView.vue'
import { useAppStore } from './stores/app.store'
import { useTodosStore } from './stores/todos.store'
import AppBreadcrumb from './layout/AppBreadcrumb.vue'

const { t } = useI18n()
const store = useTodosStore()
const appStore = useAppStore()
provide('appConfig', { apiUrl: 'http://localhost:3000' })
onMounted(async () => {
  store.fetchTodos()
  // const response = await axios.get<Todo[]>('http://localhost:3001/todos')
  // todos.value = response.data
})
</script>

<template>
  <header>
    <MenuView :title="t('title')" />
  </header>
  <AppBreadcrumb />
  <ProgressSpinner v-if="appStore.isLoading" class="overlay" />
  <RouterView> </RouterView>
  <ConfirmDialog />
</template>

<style scoped>
.overlay {
  position: absolute !important;
  top: 50%;
  left: 50%;
  width: 6rem !important;
  height: 6rem !important;
  z-index: 100; /* this seems to work for me but may need to be higher*/
}
</style>

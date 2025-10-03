<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.store'
import { useTodosStore } from '@/stores/todos.store'
import { Badge, Select } from 'primevue'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SubComp from './sub/SubComp.vue'

defineProps<{ title: string }>()
const counter = useCounterStore()
const todos = useTodosStore()
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'Template',
    icon: 'pi pi-file',
    route: '/template',
  },
  {
    label: 'About',
    icon: 'pi pi-star',
    route: '/about',
  },
  {
    label: 'Todos',
    icon: 'pi pi-list',
    route: '/todos',
    badge: true,
  },
  {
    label: 'Todo Form',
    icon: 'pi pi-plus',
    route: '/todo-form',
  },
  {
    label: 'Popover',
    icon: 'pi pi-info-circle',
    route: '/popover',
  },
  {
    label: 'Prime Forms',
    icon: 'pi pi-check-square',
    route: '/prime-forms',
  },
])
const { locale } = useI18n()
const selectedLang = ref(locale.value)
const changeLang = () => {
  locale.value = selectedLang.value
}
</script>

<template>
  <Menubar class="mb-3 bg-gray-300" :model="items">
    <template #start>
      <div class="p-d-flex p-ai-center">
        <span class="p-ml-2">{{ title }} : {{ counter.count }}</span>
      </div>
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route">
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" :value="todos.completedTodosCount" />
        </a>
      </router-link>
    </template>
    <template #end>
      <Select
        v-model="selectedLang"
        @change="changeLang"
        class="mr-3"
        option-value="code"
        optionLabel="name"
        :options="[
          { name: 'EN', code: 'en' },
          { name: 'FR', code: 'fr' },
        ]"
      />
      <SubComp :label="'Sub Component'" />
    </template>
  </Menubar>
</template>

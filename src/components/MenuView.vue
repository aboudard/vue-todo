<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.store'
import { useTodosStore } from '@/stores/todos.store'
import { Badge } from 'primevue'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import SubComp from './sub/SubComp.vue'
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
</script>

<template>
  <Menubar class="mb-3 bg-gray-300" :model="items">
    <template #start>
      <div class="p-d-flex p-ai-center">
        <span class="p-ml-2">Vue 3 Vite : {{ counter.count }}</span>
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
      <SubComp :label="'Sub Component'" />
    </template>
  </Menubar>
</template>

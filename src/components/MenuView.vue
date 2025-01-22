<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar';
import { useCounterStore } from '@/stores/counter';
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'About',
    icon: 'pi pi-star',
    route: '/about',
  },
]);
const counter = useCounterStore()
</script>

<template>
  <Menubar class="mb-3" :model="items">
    <template #start>
      <div class="p-d-flex p-ai-center">
        <span class="p-ml-2">Vue 3 Vite : {{ counter.count }}</span>
      </div>
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
        </router-link>
    </template>
  </Menubar>
</template>

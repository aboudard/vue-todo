<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const home = { icon: 'pi pi-home', to: '/' }
interface BreadcrumbItem {
  label: string
  [key: string]: any
}

const breadcrumbRoutes = ref<BreadcrumbItem[]>([])

const route = useRoute()
const router = useRouter()

function navigate() {
  router.push(home.to)
}

function setBreadcrumbRoutes() {
  if (Array.isArray(route.meta.breadcrumb)) {
    breadcrumbRoutes.value = route.meta.breadcrumb as BreadcrumbItem[]

    return
  }

  breadcrumbRoutes.value = route.fullPath
    .split('/')
    .filter((item) => item !== '')
    .filter((item) => isNaN(Number(item)))
    .map((item) => ({
      label: item.charAt(0).toUpperCase() + item.slice(1)
    }))
}

watch(
  route,
  () => {
    setBreadcrumbRoutes()
  },
  { immediate: true },
)
</script>

<template>
  <div class="layout-breadcrumb-container">
    <nav class="layout-breadcrumb">
      <ol>
        <li>
          <i :class="[home.icon, 'cursor-pointer']" @click="navigate"></i>
        </li>
        <li><i class="pi pi-angle-right"></i></li>
        <template v-for="(item, index) in breadcrumbRoutes" :key="index">
          <li>
            <span> {{ item.label }}</span>
          </li>
          <li v-if="index !== breadcrumbRoutes.length - 1">
            <i class="pi pi-angle-right"></i>
          </li>
        </template>
      </ol>
    </nav>

    <div class="layout-breadcrumb-buttons">
      <Button rounded text plain>
        <FontAwesomeIcon :icon="['fa-brands', 'wikipedia-w']" />
      </Button>
    </div>
  </div>
</template>

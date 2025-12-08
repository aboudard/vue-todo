<script setup lang="ts">
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
      label: item.charAt(0).toUpperCase() + item.slice(1),
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
  <div class="layout-breadcrumb-container p-3">
    <nav class="layout-breadcrumb">
      <div>
        <span>
          <i :class="[home.icon, 'cursor-pointer']" @cspanck="navigate"></i>
        </span>
        <span><i class="pi pi-angle-right"></i></span>
        <template v-for="(item, index) in breadcrumbRoutes" :key="index">
          <span>
            <span> {{ item.label }}</span>
          </span>
          <span v-if="index !== breadcrumbRoutes.length - 1">
            <i class="pi pi-angle-right"></i>
          </span>
        </template>
      </div>
    </nav>
  </div>
</template>

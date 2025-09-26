// src/guards/loader.guard.ts

import { useAppStore } from "@/stores/app.store";
import type { Router } from "vue-router";

export function setupLoaderGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const appStore = useAppStore()
    appStore.setLoading(true);
    console.log('Navigation started');
    next();
  });

  router.afterEach(() => {
    const appStore = useAppStore()
    appStore.setLoading(false);
    console.log('Navigation finished');
  });
}

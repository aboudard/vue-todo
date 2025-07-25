<script setup lang="ts">
import FancyStuff from '@/components/FancyStuff.vue';
import AppBreadcrumb from '@/layout/AppBreadcrumb.vue';

</script>

<template>
  <div class="p-3">
    <h1>Template View</h1>
    <div class="my-3">
      <FancyStuff>
        <template #header>
          <h1>Fancy Stuff Header</h1>
        </template>
        <p>This is some fancy stuff!</p>
        <template #footer>
          <span class="border border-blue-500 bg-green-500 text-white px-2 py-1 rounded">
            Fancy Stuff Footer
          </span>
        </template>
      </FancyStuff>

      <FancyStuff>
        Content of stuff
        <template #footer>
          <p>Poor footer</p>
        </template>
      </FancyStuff>

      <FancyStuff>
        <template v-slot:default="{ text, count }">
          Third stuff {{ text }} - {{ count }}
        </template>
        <template v-slot:footer>
          <p>Poor footer</p>
        </template>
      </FancyStuff>
    </div>
    <AppBreadcrumb />
  </div>
</template>

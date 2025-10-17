<script setup lang="ts">
import FancyStuff from '@/components/FancyStuff.vue'
import { Button } from 'primevue'
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
          <div class="border border-blue-500 bg-green-500 text-white px-2 m-2 py-1 rounded">
            Fancy Stuff Footer
          </div>
        </template>
      </FancyStuff>

      <FancyStuff>
        Content of stuff
        <template #footer>
          <p>Poor footer</p>
        </template>
      </FancyStuff>

      <FancyStuff>
        <template v-slot:default="{ text, count, myCall }">
          Third stuff {{ text }} - {{ count }}
          <Button @click="myCall">Call from Third Stuff</Button>
        </template>
        <template v-slot:footer>
          <p>Poor footer</p>
        </template>
      </FancyStuff>
    </div>
  </div>
</template>

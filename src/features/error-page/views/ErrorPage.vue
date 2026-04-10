<script setup lang="ts">
// @ts-nocheck
import { Button } from 'primevue';
import { onMounted, reactive, ref } from 'vue';

const flagButton = ref(false)
const user = { name: 'Bob' }
const userState = reactive({ user })

onMounted(() => {
  ; (globalThis as { myUndefinedFunction?: () => void }).myUndefinedFunction!()
})

const showMyButton = (): void => {
  flagButton.value = true
}

const changeUserName = (): void => {
  userState.user = { name: 'Charlie', email: 'charlie@example.com' };
  userState.user = null;
  userState.user.name = 'David';
}

</script>

<template>
  <div class="p-3">
    <h2>Error page</h2>
    <MyButton v-if="flagButton" />
    <Button @click="showMyButton" label="Click me" />
    <Button @click="changeUserName" label="Change User Name" />
  </div>
</template>

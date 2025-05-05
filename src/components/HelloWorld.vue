<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <p class="green">{{ msg }}</p>
  </div>
</template>

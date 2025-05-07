<script setup lang="ts">
const props = defineProps<{
  streak: Number
}>()
</script>
<template>
  <div v-if="streak >= 1" role="alert" class="alert alert-info w-full shadow-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span class="font-semibold text-white"
      >You're on a {{ streak }} day streak! <br />Make sure you keep up the momentum.</span
    >
  </div>
</template>

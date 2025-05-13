<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'Related categories',
  },
})
</script>

<template>
  <div class="w-full whitespace-nowrap text-xs font-medium tracking-tight text-neutral-500">
    {{ text }}
  </div>
</template>

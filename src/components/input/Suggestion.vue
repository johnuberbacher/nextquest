<script setup lang="ts">
const props = defineProps<{
  suggestions: Array<string>
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

function handleClick(suggestion: string) {
  emit('select', suggestion)
}
</script>

<template>
  <div class="flex w-full flex-row flex-wrap gap-1">
    <div
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="handleClick(suggestion)"
      class="cursor-pointer rounded-full border border-dashed border-neutral-400 px-2 py-0.5 text-xs dark:border-neutral-700"
    >
      {{ suggestion }}
    </div>
  </div>
</template>

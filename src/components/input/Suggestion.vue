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
  <div class="mt-0.5 flex w-full flex-row flex-wrap gap-x-1 gap-y-1.5">
    <div
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="handleClick(suggestion)"
      class="cursor-pointer rounded-full border border-dashed border-neutral-400 px-2 py-0.5 text-[11px] dark:border-neutral-600 dark:text-neutral-300"
    >
      {{ suggestion }}
    </div>
  </div>
</template>

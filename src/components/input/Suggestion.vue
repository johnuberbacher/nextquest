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
  <div class="w-full max-w-full overflow-hidden">
    <div
      class="flex w-full flex-row gap-x-1 gap-y-1.5 overflow-x-auto overflow-y-hidden md:flex-wrap md:overflow-auto"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="handleClick(suggestion)"
        class="border-neutral-400 dark:border-neutral-600 dark:text-neutral-300 py-0.25 cursor-pointer whitespace-nowrap rounded-full border border-dashed px-2 text-[11px]"
      >
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

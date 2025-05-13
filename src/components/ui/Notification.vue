<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'dismiss'): void
}>()

const { title, description, icon } = props

// Dismiss handler
const handleDismiss = () => {
  emit('dismiss')
}
</script>

<template>
  <div class="relative w-full rounded-2xl bg-neutral-900 px-3 py-4 shadow-lg dark:bg-neutral-700">
    <div class="absolute right-0 top-0 p-2">
      <button class="btn btn-sm btn-circle btn-ghost" @click="handleDismiss">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-6 w-6">
          <path
            d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="flex flex-row gap-3">
      <div
        class="flex aspect-square h-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-center text-white"
      >
        <div class="text-md flex aspect-square h-auto w-full items-center justify-center">
          {{ icon }}
        </div>
      </div>
      <div class="flex w-full flex-col gap-2 text-start">
        <div class="text-sm font-bold text-white">{{ title }}</div>
        <div class="text-xs text-neutral-300">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

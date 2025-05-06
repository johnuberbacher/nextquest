<script setup lang="ts">
import { defineProps } from 'vue'

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

const { title, description, icon } = props
</script>

<template>
  <div class="relative w-full rounded-2xl bg-neutral-900 p-4 shadow-lg dark:bg-neutral-700">
    <div class="absolute right-0 top-0 p-2">
      <button class="btn btn-sm btn-circle btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-6 w-6">
          <path
            d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="flex flex-row gap-4">
      <div
        class="flex aspect-square h-16 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-center text-white shadow-sm"
      >
        <div class="flex aspect-square items-center justify-center text-3xl">
          {{ icon }}
        </div>
      </div>
      <div class="flex w-full flex-col gap-1">
        <div class="font-bold text-white">{{ title }}</div>
        <div class="text-sm text-neutral-300">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

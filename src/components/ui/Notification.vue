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
  <div class="relative w-full rounded-xl bg-neutral-900 p-4 shadow-lg">
    <div class="absolute right-0 top-0 p-2">
      <button class="btn btn-sm btn-circle btn-ghost">X</button>
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

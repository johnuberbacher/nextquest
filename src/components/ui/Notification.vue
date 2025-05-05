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
  <div class="w-full bg-gray-700 p-4 rounded-xl shadow-lg relative">
    <div class="absolute top-0 right-0 p-2">
      <button class="btn btn-sm btn-circle btn-ghost">X</button>
    </div>
    <div class="flex flex-row gap-4">
      <div
        class="text-white rounded-full aspect-square h-16 text-center flex items-center justify-center bg-white dark:bg-gray-600"
      >
        <div class="text-3xl aspect-square flex items-center justify-center">
          {{ icon }}
        </div>
      </div>
      <div class="flex flex-col gap-1 w-full">
        <div class="text-white font-bold">{{ title }}</div>
        <div class="text-gray-300 text-sm">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

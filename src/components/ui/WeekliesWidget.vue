<script setup lang="ts">
import { RiCheckFill } from '@remixicon/vue'
import { useTaskStore } from '@/stores/useTaskStore'

const store = useTaskStore()
const { tasks, createTask } = store
</script>
<template>
  <div class="flex w-full flex-col items-start justify-start gap-4 px-6 pb-6"></div>
</template>

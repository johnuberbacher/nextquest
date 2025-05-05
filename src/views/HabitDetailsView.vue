<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import SingleSelectChips from '@/components/input/SingleSelectChips.vue'
import MultiSelectWeekdays from '@/components/input/MultiSelectWeekdays.vue'
import TimePicker from '@/components/input/TimePicker.vue'
import ColorPicker from '@/components/input/ColorPicker.vue'
import EmojiPicker from '@/components/input/EmojiPicker.vue'
import FullScreenLoading from '@/components/ui/FullScreenLoading.vue'

const route = useRoute()
const taskId = ref(route.params.id)

const store = useTaskStore()
const { tasks, createTask } = store
</script>

<template>
  <FullScreenLoading v-if="!tasks" />
  <div v-else class="flex w-full flex-col items-start justify-start gap-8 p-6">
    <!-- Form -->
    <div class="flex w-full flex-col items-start justify-start gap-2">
      <div class="text-2xl font-bold text-gray-900 dark:text-white">Reading habit</div>
      <div class="text-sm text-gray-500 dark:text-gray-500">
        Enter the details of your new habit below. You can choose the time, frequency, and other
        options to customize your habit.
      </div>
      {{ taskId }}
    </div>
  </div>
</template>

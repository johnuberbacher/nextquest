<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import SingleSelectChips from '@/components/input/SingleSelectChips.vue'
import MultiSelectWeekdays from '@/components/input/MultiSelectWeekdays.vue'
import TimePicker from '@/components/input/TimePicker.vue'
import ColorPicker from '@/components/input/ColorPicker.vue'
import EmojiPicker from '@/components/input/EmojiPicker.vue'
import FullScreenLoading from '@/components/ui/FullScreenLoading.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => route.params.id as string)

const task = computed(() => taskStore.getTaskById(id.value))

const taskColor = computed(() => task.value?.color || 'bg-red-200')

const router = useRouter()

const taskStore = useTaskStore()
const { getTaskById } = taskStore

// Form fields
const selectedDuration = ref(3) // in minutes
const selectedDays = ref([1]) // at least one day
const selectedTimeOfDay = ref('05:00') // time in HH:mm
const selectedColor = ref('bg-red-50')
const selectedEmoji = ref('😀')
const taskName = ref('') // Optional: can be static or editable later
const taskDescription = ref('') // Optional: can be static or editable later

onMounted(() => {
  console.log('Mounted with ID:', id.value)
  if (!route.params.id || route.params.id === '') {
    router.push('/')
  }
})

watchEffect(() => {
  if (!route.params.id || route.params.id === '') {
    router.push('/')
  }
})

watchEffect(() => {
  if (task.value) {
    console.log('Task loaded:', task.value)
  }
})
</script>

<template>
  <FullScreenLoading v-if="!task" />
  <div
    v-else
    class="flex h-full w-full flex-grow flex-col items-start justify-start gap-6 overflow-hidden p-6"
  >
    <div class="flex w-full flex-row items-center justify-start gap-3">
      <div
        class="h-21 flex aspect-square items-center justify-center rounded-full text-center text-white"
        :class="[taskColor]"
      >
        <div class="-mt-1 ml-0.5 flex items-center justify-center text-4xl">{{ task.icon }}</div>
      </div>
      <div class="flex w-full flex-col items-start justify-start gap-2">
        <div class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ task.categoryId + ' habit' }}
        </div>
        <div class="text-sm text-neutral-500 dark:text-neutral-500">
          {{ task.description || 'error!' }}
        </div>
      </div>
    </div>

    <div
      class="flex w-full flex-col items-start justify-start gap-6 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Short description</label>
        <div class="">{{ taskDescription || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Duration</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Repeats every</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Frequency/Time of Day</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>

      <fieldset class="flex w-full flex-col gap-1">
        <label class="text-sm font-semibold dark:text-white">Created</label>
        <div class="">{{ taskDuration || 'error!' }}</div>
      </fieldset>
    </div>
    <button
      @click="handleSubmit"
      :disabled="fieldValidation"
      class="btn btn-outline btn-error btn-sm ml-auto mr-0 rounded-full"
    >
      Delete this habit
    </button>
  </div>
</template>

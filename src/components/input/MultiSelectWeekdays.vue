<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [0],
  },
})

const emit = defineEmits(['update:modelValue'])

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const selectedDays = ref([...props.modelValue])

watch(
  () => props.modelValue,
  (val) => {
    selectedDays.value = val.length > 0 ? [...val] : [0]
  },
)

const toggleDay = (index: number) => {
  if (selectedDays.value.includes(index)) {
    if (selectedDays.value.length > 1) {
      selectedDays.value = selectedDays.value.filter((i) => i !== index)
    }
  } else {
    selectedDays.value.push(index)
  }

  // Update the parent model
  emit('update:modelValue', [...selectedDays.value])
}

// Compute label text based on selected days
const labelText = computed(() => {
  if (selectedDays.value.length === 7) return 'Repeats Everyday'
  if (selectedDays.value.length === 1) return 'Repeats on ' + weekdays[selectedDays.value[0]] ?? ''
  return (
    'Repeats on ' +
    selectedDays.value
      .sort((a, b) => a - b)
      .map((i) => weekdays[i].slice(0, 3))
      .join(', ')
  )
})
</script>

<template>
  <fieldset class="flex w-full flex-col gap-1">
    <label class="text-sm font-semibold dark:text-white">{{ labelText }}</label>

    <div
      class="flex w-full flex-row items-center justify-between gap-2 overflow-x-auto scroll-smooth sm:justify-start"
    >
      <div
        v-for="(day, index) in weekdays"
        :key="index"
        :class="[
          'select-none cursor-pointer rounded-full aspect-square h-10 w-10 text-center flex flex-col items-center justify-center',
          selectedDays.includes(index)
            ? 'bg-orange-50 dark:bg-neutral-800 border border-orange-700 shadow-sm'
            : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
        ]"
        @click="toggleDay(index)"
      >
        <div class="whitespace-nowrap text-xs font-semibold text-neutral-800 dark:text-white">
          {{ day.charAt(0) }}
        </div>
      </div>
    </div>
  </fieldset>
</template>

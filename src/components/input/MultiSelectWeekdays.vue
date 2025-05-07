<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ['Sun'],
  },
})

const emit = defineEmits(['update:modelValue'])

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const selectedDays = ref([...props.modelValue])

watch(
  () => props.modelValue,
  (val) => {
    selectedDays.value = val.length > 0 ? [...val] : ['Sun']
  },
)

const toggleDay = (day: string) => {
  if (selectedDays.value.includes(day)) {
    if (selectedDays.value.length > 1) {
      selectedDays.value = selectedDays.value.filter((i) => i !== day)
    }
  } else {
    selectedDays.value.push(day)
  }

  // Ensure that the value is always an array of weekday names
  emit('update:modelValue', [...selectedDays.value])
}

const labelText = computed(() => {
  if (selectedDays.value.length === 7) return 'Repeats Everyday'
  if (selectedDays.value.length === 1) return 'Repeats on ' + selectedDays.value[0]
  return (
    'Repeats on ' +
    selectedDays.value.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b)).join(', ')
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
          'cursor-pointer rounded-full aspect-square h-10 w-10 text-center flex flex-col items-center justify-center',
          selectedDays.includes(day)
            ? 'bg-orange-50 dark:bg-neutral-800 border border-orange-700 shadow-sm'
            : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
        ]"
        @click="toggleDay(day)"
      >
        <div class="whitespace-nowrap text-xs font-semibold text-neutral-800 dark:text-white">
          {{ day }}
        </div>
      </div>
    </div>
  </fieldset>
</template>

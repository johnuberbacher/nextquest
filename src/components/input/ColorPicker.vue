<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Select label color',
  },
})

const emit = defineEmits(['update:modelValue'])

const colorClasses = [
  'bg-red-100 dark:bg-red-200', // R
  'bg-orange-100 dark:bg-orange-200', // O
  'bg-yellow-100 dark:bg-yellow-200', // Y
  'bg-green-100 dark:bg-green-200', // G
  'bg-blue-100 dark:bg-blue-200', // B
  'bg-indigo-100 dark:bg-indigo-200', // I
  'bg-violet-100 dark:bg-violet-200', // V
]

const selectedIndex = ref(colorClasses.indexOf(props.modelValue) || 0)

watch(
  () => props.modelValue,
  (val) => {
    const idx = colorClasses.indexOf(val)
    if (idx !== -1) selectedIndex.value = idx
  },
)

const selectColor = (index) => {
  selectedIndex.value = index
  emit('update:modelValue', colorClasses[index])
}
</script>
<template>
  <fieldset class="flex w-full flex-col gap-2">
    <label v-if="label" class="text-sm font-semibold dark:text-white">
      {{ label }}
    </label>

    <div
      class="flex w-full flex-row items-center justify-start gap-2.5 overflow-x-auto overflow-y-visible scroll-smooth py-1"
    >
      <div
        v-for="(color, index) in colorClasses"
        :key="index"
        :class="[
          'select-none cursor-pointer rounded-full border border-neutral-200 dark:border-neutral-700 aspect-square h-8 w-8 text-center flex items-center justify-center',
          color,
          selectedIndex === index ? 'outline outline-offset-3 outline-orange-700 shadow-sm' : '',
        ]"
        @click="selectColor(index)"
      ></div>
    </div>
  </fieldset>
</template>

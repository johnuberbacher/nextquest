<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'bg-red-500',
  },
  label: {
    type: String,
    default: 'Select label color',
  },
})

const emit = defineEmits(['update:modelValue'])

const colorClasses = [
  'bg-red-200', // R
  'bg-orange-200', // O
  'bg-yellow-200', // Y
  'bg-green-200', // G
  'bg-blue-200', // B
  'bg-indigo-200', // I
  'bg-violet-200', // V
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
  <fieldset class="w-full gap-1 flex flex-col">
    <label v-if="label" class="text-sm dark:text-white font-semibold">
      {{ label }}
    </label>

    <div
      class="p-1 w-full flex flex-row gap-2.5 items-center justify-start overflow-x-auto overflow-y-visible scroll-smooth"
    >
      <div
        v-for="(color, index) in colorClasses"
        :key="index"
        :class="[
          'select-none cursor-pointer rounded-full aspect-square h-8 w-8 text-center flex items-center justify-center',
          color,
          selectedIndex === index
            ? 'outline outline-offset-2 outline-1 outline-orange-700 shadow-sm'
            : '',
        ]"
        @click="selectColor(index)"
      ></div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedIndex = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedIndex.value = newVal
  },
)

const selectItem = (index) => {
  selectedIndex.value = index
  emit('update:modelValue', index)
}
</script>
<template>
  <label v-if="label" class="text-sm dark:text-white font-semibold">{{ label }}</label>
  <div class="w-full flex flex-row gap-2 overflow-x-auto scroll-smooth">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'select-none cursor-pointer rounded-lg px-6 py-3 text-center flex flex-col items-center justify-center',
        selectedIndex === index
          ? 'bg-orange-50 dark:bg-gray-800 border border-orange-700 shadow-sm'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      ]"
      @click="selectItem(index)"
    >
      <div class="font-semibold text-xs text-gray-800 dark:text-white whitespace-nowrap">
        {{ item }}
      </div>
    </div>
  </div>
</template>

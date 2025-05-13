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
  <label
    v-if="label"
    class="w-full whitespace-nowrap text-xs font-semibold text-neutral-900 dark:text-neutral-200"
    >{{ label }}</label
  >
  <div class="flex w-full flex-row gap-2 overflow-x-auto scroll-smooth">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'cursor-pointer rounded-lg px-4 py-3 text-center flex flex-col items-center justify-center',
        selectedIndex === index
          ? 'bg-orange-50 dark:bg-neutral-800 border border-orange-700 shadow-sm'
          : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
      ]"
      @click="selectItem(index)"
    >
      <div class="whitespace-nowrap text-xs font-semibold text-neutral-800 dark:text-white">
        {{ item }}
      </div>
    </div>
  </div>
</template>

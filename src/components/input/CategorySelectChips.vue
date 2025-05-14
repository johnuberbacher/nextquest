<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  categories: {
    type: Array as () => { id: number; icon: string; name: string }[],
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

const selectedId = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedId.value = newVal
  },
)

const selectItem = (id: number) => {
  selectedId.value = id
  emit('update:modelValue', id)
}
</script>
<template>
  <div
    v-for="(category, index) in categories"
    :key="category.id"
    :class="[
      'cursor-pointer w-full rounded-xl p-4 relative text-center flex flex-col gap-3 items-center justify-center',
      selectedId === category.id
        ? 'bg-orange-50 dark:bg-neutral-800 border border-orange-700 shadow-sm'
        : ' bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
    ]"
    @click="selectItem(category.id)"
  >
    <div class="text-4xl text-black">{{ category.icon }}</div>
    <div class="whitespace-nowrap text-sm font-medium text-black dark:text-white">
      {{ category.name }}
    </div>
  </div>
</template>

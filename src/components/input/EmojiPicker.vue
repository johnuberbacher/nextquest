<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

// Props to accept the selected value and options
const props = defineProps({
  modelValue: {
    type: String,
    default: '😀', // Default selected emoji
  },
  options: {
    type: Array,
    default: () => [
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '😊',
      '😎',
      '🙂',
      '🙃',
      '😇',
      '🥰',
      '😍',
      '🥺',
      '😋',
      '😛',
      '😜',
      '👵',
      '👴',
      '🧓',
      '👶',
      '👦',
      '👧',
      '🐶',
      '🐱',
      '🐯',
      '🦁',
      '🐰',
      '🐻',
      '🐼',
      '🦊',
      '🐻‍❄️',
      '🦄',
      '🐨',
      '🦓',
      '🦒',
      '🐘',
      '🦏',
      '🐪',
      '🦙',
      '🦉',
      '🦢',
      '🦦',
      '🐊',
      '🐸',
      '🦎',
      '🐍',
    ],
  },
  label: {
    type: String,
    default: '',
  },
})

// Emit event to update the parent component with the selected value
const emit = defineEmits(['update:modelValue'])

// Local reference to manage the selected emoji
const selectedEmoji = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedEmoji.value = newVal
  },
)

// Emit updated selected emoji when changed
const onChange = () => {
  emit('update:modelValue', selectedEmoji.value)
}
</script>

<template>
  <label v-if="label" class="text-sm font-semibold dark:text-white">{{ label }}</label>
  <select class="select w-full" v-model="selectedEmoji" @change="onChange">
    <option v-for="emoji in options" :key="emoji" :value="emoji">
      {{ emoji }}
    </option>
  </select>
</template>

<style scoped>
.select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>

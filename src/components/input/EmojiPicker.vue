<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '😀',
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
  <label
    v-if="label"
    class="text-neutral-900 dark:text-neutral-200 w-full whitespace-nowrap text-xs font-semibold"
    >{{ label }}</label
  >
  <select class="input input-sm w-full" v-model="selectedEmoji" @change="onChange">
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

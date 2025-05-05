<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import CategorySelectChips from '@/components/input/CategorySelectChips.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const { tasks } = taskStore
const { selectedCategoryId, categories } = categoryStore

const selectedCategory = ref(null)

const visibleCount = ref(8)
const incrementAmount = 8

const visibleCategories = computed(() => {
  return categories.slice(0, visibleCount.value)
})

const showMore = () => {
  visibleCount.value += incrementAmount
}

const submit = () => {
  if (selectedCategory.value !== null) {
    categoryStore.selectedCategoryId = selectedCategory.value
    router.push({ name: 'create-new-habit' })
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-start justify-start gap-6 p-6">
    <div class="flex w-full flex-col items-start justify-start gap-2">
      <div class="text-2xl font-bold text-gray-900 dark:text-white">Choose habit</div>
      <div class="text-sm text-gray-500 dark:text-gray-500">
        Select any pre-created habbits from the list below, you can choose more than one. Don't
        worry, you'll be able to make custom habits later.
      </div>
    </div>
    <div class="grid w-full grid-cols-2 flex-wrap gap-6 md:grid-cols-4">
      <CategorySelectChips :categories="visibleCategories" v-model="selectedCategory" />
      <button
        :disabled="visibleCategories.length === categories.length"
        @click="showMore"
        class="btn btn-outline col-span-2 w-full rounded-full md:col-span-4"
      >
        Show more
      </button>
      <button
        @click="submit"
        :disabled="!selectedCategory"
        class="btn btn-neutral col-span-2 w-full md:col-span-4"
      >
        Continue
      </button>
    </div>
  </div>
</template>

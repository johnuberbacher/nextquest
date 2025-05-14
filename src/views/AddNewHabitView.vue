<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import CategorySelectChips from '../components/input/CategorySelectChips.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const { tasks } = taskStore
const { selectedCategoryId, categories } = categoryStore

const selectedCategory = ref<number>(0)

const visibleCount = ref(20)
const incrementAmount = 8

const visibleCategories = computed(() => {
  return [...categories].sort(() => Math.random() - 0.5).slice(0, visibleCount.value)
})

const showMore = () => {
  visibleCount.value += incrementAmount
}

const submit = () => {
  if (typeof selectedCategory.value === 'number') {
    categoryStore.selectedCategoryId = selectedCategory.value
    router.push({ name: 'create-new-habit' })
  }
}
</script>

<template>
  <div
    class="bg-neutral-50 dark:bg-neutral-800 flex h-full w-full flex-grow flex-col items-start justify-start gap-4 overflow-hidden p-4"
  >
    <div class="flex h-auto w-full flex-col items-start justify-start gap-2">
      <div class="text-md font-bold dark:text-white">Choose habit</div>
      <div class="text-neutral-500 dark:text-neutral-500 text-sm">
        Select any pre-created habbits from the list below, you can choose more than one. Don't
        worry, you'll be able to make custom habits later.
      </div>
    </div>
    <div
      class="border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex w-full flex-grow flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden rounded-xl border bg-white"
    >
      <div class="grid w-full grid-cols-2 flex-wrap gap-4 overflow-y-auto p-4 sm:grid-cols-4">
        <CategorySelectChips :categories="visibleCategories" v-model="selectedCategory" />
        <div class="col-span-2 flex w-full items-center justify-center md:col-span-4">
          <button
            :disabled="visibleCategories.length === categories.length"
            @click="showMore"
            class="btn btn-neutral mx-auto rounded-full px-10"
          >
            More
          </button>
        </div>
      </div>
    </div>
    <div class="flex h-auto w-full flex-row items-end justify-end gap-4">
      <button
        @click="submit"
        class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        Continue
      </button>
    </div>
  </div>
</template>

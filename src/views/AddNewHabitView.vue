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

const selectedCategory = ref<number | undefined>(undefined)

const visibleCount = ref(12)
const incrementAmount = 8

const visibleCategories = computed(() => {
  return categories.slice(0, visibleCount.value)
})

const showMore = () => {
  visibleCount.value += incrementAmount
}

const submit = () => {
  if (selectedCategory.value !== null) {
    categoryStore.selectedCategoryId = selectedCategory.value ?? null
    router.push({ name: 'create-new-habit' })
  }
}
</script>

<template>
  <div class="flex w-full flex-grow flex-col items-start justify-between gap-6 overflow-hidden p-6">
    <div class="flex h-auto w-full flex-col items-start justify-start gap-2">
      <div class="text-2xl font-bold text-neutral-900 dark:text-white">Choose habit</div>
      <div class="text-sm text-neutral-500 dark:text-neutral-500">
        Select any pre-created habbits from the list below, you can choose more than one. Don't
        worry, you'll be able to make custom habits later.
      </div>
    </div>
    <div
      class="flex w-full flex-grow flex-col items-start justify-start gap-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700"
    >
      <div class="grid w-full grid-cols-2 flex-wrap gap-6 overflow-y-auto p-6 md:grid-cols-4">
        <CategorySelectChips :categories="visibleCategories" v-model="selectedCategory" />
        <div class="col-span-2 flex w-full items-center justify-center md:col-span-4">
          <button
            :disabled="visibleCategories.length === categories.length"
            @click="showMore"
            class="btn btn-outline mx-auto rounded-full"
          >
            Show more
          </button>
        </div>
      </div>
    </div>
    <div class="flex h-auto w-full flex-row items-end justify-end gap-6">
      <button
        @click="submit"
        :disabled="!selectedCategory"
        class="btn btn-primary btn-lg w-full rounded-full px-10 text-sm md:w-auto"
      >
        Continue
      </button>
    </div>
  </div>
</template>

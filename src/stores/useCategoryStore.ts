import { defineStore } from 'pinia'
import { habitCategories } from '@/data/habitCategories'
import { ref } from 'vue'

export interface Category {
  id: number
  name: string
  description?: string
  icon: string
  createdAt: Date
  startDate: Date | null
  endDate: Date | null
  suggestions: Array<string>
}

export const useCategoryStore = defineStore('category', () => {
  const selectedCategoryId = ref<number | null>(null)

  const categories = ref<Category[]>(habitCategories)

  // Optional: Helper to get category by ID
  const getCategoryById = (id: number) => {
    return categories.value.find((c) => c.id === id) || null
  }

  // Optional: Set selected category
  const selectCategory = (id: number | null) => {
    selectedCategoryId.value = id
  }

  return {
    selectedCategoryId,
    categories,
    getCategoryById,
    selectCategory,
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { nanoid } from 'nanoid'

export interface HabitEntry {
  habitId: string
  date: Date
  state: boolean
}

export interface User {
  userId: string
  name: string
  dateCreated: Date
  exp: number
  level: number
  avatar: string
  completedHabits: HabitEntry[]
}

export const useUserStore = defineStore('User', () => {
  const user = ref<User>({
    userId: '',
    name: '',
    dateCreated: new Date(),
    exp: 0,
    level: 1,
    avatar: '🧍',
    completedHabits: [],
  })

  const hasLoggedToday = (habitId: string): boolean => {
    const today = new Date().toDateString()
    return user.value.completedHabits.some(
      (e) => e.habitId === habitId && new Date(e.date).toDateString() === today,
    )
  }

  const logHabitEntry = (habitId: string, state: boolean) => {
    if (user.value) {
      const entry: HabitEntry = {
        habitId,
        date: new Date(),
        state,
      }

      if (!user.value.completedHabits) {
        user.value.completedHabits = []
      }

      // Check if the entry already exists for the same date
      const existingEntryIndex = user.value.completedHabits.findIndex(
        (e) => e.habitId === habitId && e.date.toDateString() === entry.date.toDateString(),
      )

      if (existingEntryIndex !== -1) {
        // Update existing entry
        user.value.completedHabits[existingEntryIndex].state = state
      } else {
        // Add new entry
        user.value.completedHabits.push(entry)
      }

      console.log('All Done')
      console.log(user.value)
    }
  }

  const incrementExp = (userId: string, amount: number) => {
    if (user.value) {
      user.value.exp += amount

      // Optional: Auto level-up every 100 EXP
      const levelThreshold = 100
      while (user.value.exp >= levelThreshold) {
        user.value.level++
        user.value.exp -= levelThreshold
      }
    }
  }

  return {
    user,
    hasLoggedToday,
    logHabitEntry,
    incrementExp,
  }
})

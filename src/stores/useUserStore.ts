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
  completedHabits?: HabitEntry[]
}

export const useUserStore = defineStore('User', () => {
  const Users = ref<User[]>([])

  const createUser = (
    UserInput: Partial<Omit<User, 'userId' | 'dateCreated'>> & { name?: string },
  ): User => {
    const newUser: User = {
      userId: nanoid(),
      name: UserInput.name || '',
      dateCreated: new Date(),
      exp: UserInput.exp ?? 0,
      level: UserInput.level ?? 1,
      avatar: UserInput.avatar ?? '🧍',
    }

    Users.value.push(newUser)
    return newUser
  }

  const updateUser = (userId: string, updates: Partial<User>) => {
    const index = Users.value.findIndex((t) => t.userId === userId)
    if (index !== -1) {
      Users.value[index] = { ...Users.value[index], ...updates }
    }
  }

  const resetUser = (userId: string) => {
    const user = Users.value.find((u) => u.userId === userId)
    if (user) {
      user.exp = 0
      user.level = 1
      user.avatar = '🧍'
      user.dateCreated = new Date()
    }
  }

  const incrementExp = (userId: string, amount: number) => {
    const user = Users.value.find((u) => u.userId === userId)
    if (user) {
      user.exp += amount

      // Optional: Auto level-up every 100 EXP
      const levelThreshold = 100
      while (user.exp >= levelThreshold) {
        user.level++
        user.exp -= levelThreshold
      }
    }
  }

  const getUserById = (userId: string): User | undefined =>
    Users.value.find((t) => t.userId === userId)

  return {
    Users,
    createUser,
    updateUser,
    resetUser,
    incrementExp,
    getUserById,
  }
})

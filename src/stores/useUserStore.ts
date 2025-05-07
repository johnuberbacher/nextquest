import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    userId: '123456',
    name: 'John Uber',
    dateCreated: new Date(),
    exp: 33,
    level: 99,
    avatar: '🦊',
    completedHabits: [
      {
        habitId: '2',
        date: new Date('2025-05-05T05:24:29.444Z'),
        state: true,
      },
      {
        habitId: '2',
        date: new Date('2025-05-06T05:24:09.444Z'),
        state: true,
      },
      {
        habitId: '3',
        date: new Date('2025-05-05T05:24:09.444Z'),
        state: true,
      },
      {
        habitId: '3',
        date: new Date('2025-05-07T05:24:09.444Z'),
        state: true,
      },
      {
        habitId: '3',
        date: new Date('2025-05-08T05:24:09.444Z'),
        state: true,
      },
      {
        habitId: '3',
        date: new Date('2025-05-09T05:24:09.444Z'),
        state: true,
      },
    ],
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

  const getHabitEntriesPastYear = (habitId: string): HabitEntry[] => {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    return user.value.completedHabits.filter(
      (e) => e.habitId === habitId && new Date(e.date) >= oneYearAgo,
    )
  }

  const getHabitEntriesThisWeek = (habitId: string): HabitEntry[] => {
    const now = new Date()
    const dayOfWeek = now.getDay()

    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - dayOfWeek)
    startOfWeek.setHours(0, 0, 0, 0)

    return user.value.completedHabits.filter((e) => {
      const entryDate = new Date(e.date)
      return e.habitId === habitId && entryDate >= startOfWeek
    })
  }

  const getThisWeekCompletion = (taskId: string, weekdays: number[]) => {
    const entries = getHabitEntriesThisWeek(taskId)
    const completedDays = new Set(entries.map((e) => new Date(e.date).getDay()))
    const completedCount = weekdays.filter((day) => completedDays.has(day)).length
    return {
      completed: completedCount,
      total: weekdays.length,
      percentage: weekdays.length > 0 ? Math.round((completedCount / weekdays.length) * 100) : 0,
    }
  }

  const getTwoMonthsCompletion = (taskId: string, weekdays: number[]) => {
    const now = new Date()
    const twoMonthsAgo = new Date()
    twoMonthsAgo.setMonth(now.getMonth() - 2)

    const entries = getHabitEntriesPastYear(taskId).filter((e) => {
      const date = new Date(e.date)
      return date >= twoMonthsAgo && date <= now
    })

    let totalScheduledDays = 0
    let current = new Date(twoMonthsAgo)
    while (current <= now) {
      if (weekdays.includes(current.getDay())) {
        totalScheduledDays++
      }
      current.setDate(current.getDate() + 1)
    }

    const completedDates = new Set(entries.map((e) => new Date(e.date).toDateString()))
    const completedCount = completedDates.size

    return {
      completed: completedCount,
      total: totalScheduledDays,
      percentage:
        totalScheduledDays > 0 ? Math.round((completedCount / totalScheduledDays) * 100) : 0,
    }
  }

  const getStreak = (entries: { date: string }[]): number => {
    const days = [
      ...new Set(
        entries.map((e) => {
          const d = new Date(e.date)
          d.setHours(0, 0, 0, 0)
          return d.getTime()
        }),
      ),
    ].sort((a, b) => a - b)

    let streak = 1,
      max = 1
    for (let i = 1; i < days.length; i++) {
      if (days[i] - days[i - 1] === 86400000) max = Math.max(max, ++streak)
      else streak = 1
    }

    return max >= 3 ? max : 0
  }

  const incrementExp = async (amount: number) => {
    if (user.value) {
      user.value.exp += amount

      // Optional: Auto level-up every 100 EXP
      const levelThreshold = 100
      while (user.value.exp >= levelThreshold) {
        await new Promise((r) => setTimeout(r, 2000))
        user.value.level++
        user.value.exp -= levelThreshold
      }
    }
  }

  return {
    user,
    getStreak,
    hasLoggedToday,
    logHabitEntry,
    incrementExp,
    getThisWeekCompletion,
    getHabitEntriesPastYear,
    getHabitEntriesThisWeek,
    getTwoMonthsCompletion,
  }
})

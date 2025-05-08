import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface HabitEntry {
  habitId: string
  date: Date
  state: boolean
}

export interface Achievement {
  level: number
  title: string
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
  const levelUpNotification = ref(false)

  const achievements = ref<Achievement[]>([
    { level: 1, title: 'Newbie' },
    { level: 2, title: 'Just Showed Up' },
    { level: 3, title: 'Pressed the Button' },
    { level: 5, title: '5-Day Wonder' },
    { level: 10, title: 'Actually Still Here' },
    { level: 20, title: 'Mildly Impressive' },
    { level: 30, title: 'Getting the Hang of It' },
    { level: 40, title: 'Streak Machine' },
    { level: 50, title: 'Halfway to Legend' },
    { level: 60, title: 'Probably Has a Spreadsheet' },
    { level: 70, title: 'Can’t Stop, Won’t Stop' },
    { level: 80, title: 'Powered by Coffee and Systems' },
    { level: 90, title: 'Basically a Self-Help Book' },
    { level: 100, title: 'Transcended the To-Do List' },
  ])

  const user = ref<User>({
    userId: '123456',
    name: 'John Uber',
    dateCreated: new Date(),
    exp: 0,
    level: 1,
    avatar: '🦊',
    completedHabits: [
      {
        habitId: '4',
        date: new Date('2025-05-05T05:24:09.444Z'),
        state: true,
      },
      {
        habitId: '4',
        date: new Date('2025-05-06T05:24:09.444Z'),
        state: true,
      },

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

  const getThisWeekCompletion = (taskId: string, totalDaysThisWeek: number) => {
    const entries = getHabitEntriesThisWeek(taskId)
    return {
      completed: entries.length,
      total: totalDaysThisWeek,
      percentage: Math.round((entries.length / totalDaysThisWeek) * 100),
    }
  }

  const getTwoMonthsCompletion = (taskId: string, daysPerWeek: number) => {
    const now = new Date()
    const twoMonthsAgo = new Date()
    twoMonthsAgo.setMonth(now.getMonth() - 2)

    const entries = user.value.completedHabits.filter((e) => {
      const date = new Date(e.date)
      return e.habitId === taskId && date >= twoMonthsAgo && date <= now
    })

    const completedDates = new Set(entries.map((e) => new Date(e.date).toDateString()))

    const weeksInTwoMonths = 8
    const expectedTotal = daysPerWeek * weeksInTwoMonths

    return {
      completed: completedDates.size,
      total: expectedTotal,
      percentage: expectedTotal === 0 ? 0 : Math.round((completedDates.size / expectedTotal) * 100),
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

  const getAchievementTitle = () => {
    const reversed = [...achievements.value].sort((a, b) => b.level - a.level)
    const achievement = reversed.find((a) => user.value.level >= a.level)
    return achievement?.title ?? 'error'
  }

  const getExpForNextLevel = (level: number): number => {
    if (level === 1) return 1 // Immediate level-up from level 1

    // Custom EXP requirements for levels 2-5
    if (level === 2) return 2 // Level 2 requires 2 EXP gains
    if (level === 3) return 3 // Level 3 requires 3 EXP gains
    if (level === 4) return 4 // Level 4 requires 4 EXP gains
    if (level === 5) return 5 // Level 5 requires 5 EXP gains

    // After level 5, use cubic growth formula
    const progress = (level - 1) / 98 // Normalize to 0..1 range
    const scale = 5000 // Adjust scale so that level 99->100 ~= 200 calls at 10% gain
    return Math.floor(10 + Math.pow(progress, 3) * scale)
  }

  const incrementUserExp = async () => {
    if (!user.value) {
      console.log('No user found, returning...')
      return
    }

    const level = user.value.level
    const requiredExp = getExpForNextLevel(level)

    // Log base EXP gain for debugging
    const baseGain = Math.max(1, Math.floor(requiredExp * 0.1))
    user.value.exp += baseGain
    console.log(`User gained ${baseGain} EXP, total EXP: ${user.value.exp}`)

    // Level up logic
    while (user.value.level < 100 && user.value.exp >= getExpForNextLevel(user.value.level)) {
      const required = getExpForNextLevel(user.value.level)

      // Wait before applying level-up
      // await new Promise((r) => setTimeout(r, 2000))

      // Level up the user
      user.value.level++
      user.value.exp = 0 // Reset EXP after level-up
      console.log(`Level up! New level: ${user.value.level}, EXP reset to 0`)

      levelUpNotification.value = true
      console.log('Level-up notification triggered')

      if (user.value.exp < getExpForNextLevel(user.value.level)) {
        console.log('Not enough EXP to level up further.')
        break
      }
    }

    if (user.value.level >= 100) {
      user.value.exp = 0
      console.log('Congratulations max level reached. EXP reset to 0.')
    }
  }

  return {
    user,
    achievements,
    getAchievementTitle,
    getStreak,
    hasLoggedToday,
    logHabitEntry,
    incrementUserExp,
    getExpForNextLevel,
    getThisWeekCompletion,
    getHabitEntriesPastYear,
    getHabitEntriesThisWeek,
    getTwoMonthsCompletion,
    levelUpNotification,
  }
})

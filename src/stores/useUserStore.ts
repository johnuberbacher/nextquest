// useUserStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface HabitEntry {
  habitId: string
  date: Date
  state: boolean
}

export interface AchievementEntry {
  achievementId: number
  date: Date
}

export interface UserTitle {
  level: number
  title: string
  color: string
}

export interface User {
  name: string
  dateCreated: Date
  exp: number
  level: number
  avatar: string
  completedHabits: HabitEntry[]
  achievements: AchievementEntry[]
}

export const useUserStore = defineStore('User', () => {
  const levelUpNotification = ref(false)
  const achievementNotification = ref(false)

  const user = ref<User | null>(null)

  const userTitle = ref<UserTitle[]>([
    { level: 1, title: 'Newbie', color: 'bg-gray-200 text-gray-800' },
    { level: 2, title: 'Clicked Once', color: 'bg-green-200 text-green-800' },
    { level: 3, title: 'Got Up', color: 'bg-blue-200 text-blue-800' },
    { level: 5, title: 'Small Steps', color: 'bg-yellow-200 text-yellow-800' },
    { level: 10, title: 'Still Here', color: 'bg-teal-200 text-teal-800' },
    { level: 20, title: 'Made a List', color: 'bg-indigo-200 text-indigo-800' },
    { level: 30, title: 'Did a Thing', color: 'bg-purple-200 text-purple-800' },
    { level: 40, title: 'On a Roll', color: 'bg-red-200 text-red-800' },
    { level: 50, title: 'Halfway Hero', color: 'bg-orange-200 text-orange-800' },
    { level: 60, title: 'Task Machine', color: 'bg-pink-200 text-pink-800' },
    { level: 70, title: 'No Chill', color: 'bg-indigo-300 text-indigo-900' },
    { level: 80, title: 'System Fan', color: 'bg-lime-300 text-lime-900' },
    { level: 90, title: 'Auto Mode', color: 'bg-blue-300 text-blue-900' },
    { level: 100, title: 'Fully Synced', color: 'bg-teal-400 text-teal-900' },
  ])

  const hasLoggedToday = (habitId: string): boolean => {
    return hasLoggedOnDate(habitId, new Date())
  }

  const hasLoggedOnDate = (habitId: string, dateToCheck: Date): boolean => {
    const checkDateStr = dateToCheck?.toDateString()
    return user.value.completedHabits.some(
      (e) => e.habitId === habitId && new Date(e.date).toDateString() === checkDateStr,
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

      const entryDateStr = entry.date.toDateString()

      const existingEntryIndex = user.value.completedHabits.findIndex((e) => {
        const eDate = new Date(e.date)
        return e.habitId === habitId && eDate.toDateString() === entryDateStr
      })

      if (existingEntryIndex !== -1) {
        user.value.completedHabits[existingEntryIndex].state = state
      } else {
        user.value.completedHabits.push(entry)
      }

      saveUserToLocalStorage()
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

  const createUser = (name: string, avatar: string) => {
    if (!user.value) {
      user.value = {
        name,
        avatar,
        dateCreated: new Date(),
        exp: 0,
        level: 1,
        completedHabits: [],
        achievements: [],
      }
    }
    saveUserToLocalStorage()
  }

  const getUserTitle = () => {
    const reversed = [...userTitle.value].sort((a, b) => b.level - a.level)
    const achievement = reversed.find((a) => user.value.level >= a.level)
    return achievement
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

  const setUserAchievement = (achievementId: number) => {
    if (!user.value) {
      console.log('error: no user found')
      return
    }

    console.log(user.value)

    const alreadyHasAchievement = user.value.achievements.some(
      (entry) => entry.achievementId === achievementId,
    )

    if (alreadyHasAchievement) {
      console.log('User already has this achievement.')
      return
    }

    user.value.achievements.push({
      achievementId,
      date: new Date(),
    })
    saveUserToLocalStorage()

    console.log('Achievement saved to user data.')

    achievementNotification.value = true
    setTimeout(() => {
      // achievementNotification.value = false
    }, 4000)
  }

  const incrementUserExp = async () => {
    if (!user.value) {
      console.log('error: no user found')
      return
    }

    const level = user.value.level
    const requiredExp = getExpForNextLevel(level)

    const baseGain = Math.max(1, Math.floor(requiredExp * 0.1))
    user.value.exp += baseGain
    console.log(`User gained ${baseGain} EXP, total EXP: ${user.value.exp}`)

    while (user.value.level < 100 && user.value.exp >= getExpForNextLevel(user.value.level)) {
      const required = getExpForNextLevel(user.value.level)
      user.value.level++
      user.value.exp = 0 // subtract `required` to preserve overflow EXP
      console.log(`Level up! New level: ${user.value.level}, EXP reset to 0`)

      // Check for some achievos here
      const level = user.value.level

      if (level === 2 || (level % 10 === 0 && level <= 100)) {
        const achievementId = level === 2 ? 0 : level / 10
        console.log(achievementId)
        setUserAchievement(achievementId)
      }

      levelUpNotification.value = true

      if (user.value.exp < getExpForNextLevel(user.value.level)) {
        console.log('Not enough EXP to level up further.')
        break
      }
    }

    if (user.value.level >= 100) {
      user.value.exp = 0
      console.log('Congratulations max level reached. EXP reset to 0.')
    }

    saveUserToLocalStorage()
  }

  const saveUserToLocalStorage = async () => {
    return Promise.resolve().then(() => {
      localStorage.setItem('users', JSON.stringify(user.value))
    })
  }

  const loadUserFromLocalStorage = async () => {
    return Promise.resolve().then(() => {
      const saved = localStorage.getItem('users')
      if (saved) {
        const parsed = JSON.parse(saved)
        parsed.dateCreated = new Date(parsed.dateCreated)
        parsed.completedHabits = parsed.completedHabits.map((e: any) => ({
          ...e,
          date: new Date(e.date),
        }))
        user.value = parsed
      } else {
        // If no saved data then we need to send them to the Intro Screen
      }
    })
  }

  return {
    user,
    userTitle,
    createUser,
    getUserTitle,
    getStreak,
    hasLoggedToday,
    hasLoggedOnDate,
    loadUserFromLocalStorage,
    logHabitEntry,
    incrementUserExp,
    getExpForNextLevel,
    getThisWeekCompletion,
    getHabitEntriesPastYear,
    getHabitEntriesThisWeek,
    getTwoMonthsCompletion,
    levelUpNotification,
    achievementNotification,
  }
})

// useUserStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { achievements } from '@/data/achievements.js'
import { useTaskStore } from '@/stores/useTaskStore'

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
  const showIntroWelcomeScreen = ref(false)

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
    if (!user.value) return

    const now = new Date()
    const entry: HabitEntry = {
      habitId,
      date: now,
      state,
    }

    const entryDateStr = now.toDateString()
    const existingEntryIndex = user.value.completedHabits.findIndex(
      (e) => e.habitId === habitId && new Date(e.date).toDateString() === entryDateStr,
    )

    if (existingEntryIndex !== -1) {
      user.value.completedHabits[existingEntryIndex].state = state
    } else {
      user.value.completedHabits.push(entry)
    }

    // --- achievo checks ---
    const set = setUserAchievement
    const taskStore = useTaskStore()
    const { tasks } = taskStore
    const allHabits = tasks
    const completedToday = user.value.completedHabits.filter(
      (e) => new Date(e.date).toDateString() === now.toDateString(),
    )

    // 20: Built Differently – 3-day streak where every habit is completed
    const checkBuiltDifferently = () => {
      const all = allHabits.map((task) => task.id)
      let success = true
      for (let i = 0; i < 3; i++) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
        const completedToday = user.value.completedHabits
          .filter((e) => new Date(e.date).toDateString() === date.toDateString() && e.state)
          .map((e) => e.habitId)
        for (const id of all) {
          if (!completedToday.includes(id)) {
            success = false
            break
          }
        }
        if (!success) break
      }
      if (success && all.length > 0) set(20)
    }

    // 21: Weekend Warrior – logged on Sat & Sun
    const checkWeekendWarrior = () => {
      const logs = user.value.completedHabits.filter((e) => {
        const d = new Date(e.date)
        return d.getDay() === 6 || d.getDay() === 0 // Sat or Sun
      })
      const daysLogged = new Set(logs.map((e) => new Date(e.date).getDay()))
      if (daysLogged.has(6) && daysLogged.has(0)) set(21)
    }

    // 23: Night Owl – after midnight (00:00 to 04:59)
    if (now.getHours() < 5) set(23)

    // 24: Early Bird – before 7 AM
    if (now.getHours() < 7) set(24)

    // 25: Ghost Mode – 7-day logging streak (any habit logged each day)
    const dates = new Set(user.value.completedHabits.map((e) => new Date(e.date).toDateString()))
    const streakCheck = () => {
      let count = 0
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        if (dates.has(date.toDateString())) {
          count++
        } else break
      }
      if (count === 7) set(25)
    }

    // 26: Completionist – all habits done for 7 straight days
    const checkCompletionist = () => {
      const allIds = allHabits.map((h) => h.id)
      if (!allIds.length) return

      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dayCompleted = user.value.completedHabits
          .filter((e) => new Date(e.date).toDateString() === date.toDateString() && e.state)
          .map((e) => e.habitId)

        for (const id of allIds) {
          if (!dayCompleted.includes(id)) return
        }
      }
      set(26)
    }

    // 27: Overachiever – more than 10 habits logged in a day
    if (completedToday.length > 10) set(27)

    // 28: Return of the King – first log after 7+ days away
    const recent = user.value.completedHabits
      .filter((e) => e.habitId === habitId)
      .map((e) => new Date(e.date))
      .sort((a, b) => b.getTime() - a.getTime())

    if (recent.length > 1) {
      const last = recent[1]
      const diff = (now.getTime() - last.getTime()) / (1000 * 3600 * 24)
      if (diff >= 7) set(28)
    }

    // run complex checks
    checkBuiltDifferently()
    checkWeekendWarrior()
    streakCheck()
    checkCompletionist()

    saveUserToLocalStorage()
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

  const deleteUser = () => {
    if (user.value) {
      const taskStore = useTaskStore()
      const { deleteAllTasks } = taskStore
      deleteAllTasks()
      user.value = null
      localStorage.removeItem('user')
    }
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

  const getUserAchievement = (achievementId: number) => {
    const achievement = achievements.find((a) => a.id === achievementId)
    if (!achievement) {
      console.warn(`Achievement with ID ${achievementId} not found.`)
    }
    return achievement
  }

  const setUserAchievement = (achievementId: number) => {
    if (!user.value) {
      console.log('error: no user found')
      return
    }

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

    // achievementNotification.value = true
    // setTimeout(() => {
    //   achievementNotification.value = false
    // }, 5000)
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

      // levelUpNotification.value = true

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
      localStorage.setItem('user', JSON.stringify(user.value))
    })
  }

  const loadUserFromLocalStorage = async () => {
    return Promise.resolve().then(() => {
      const saved = localStorage.getItem('user')
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
    deleteUser,
    getUserTitle,
    getUserAchievement,
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
    setUserAchievement,
    levelUpNotification,
    achievementNotification,
    showIntroWelcomeScreen,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'
import { useRouter } from 'vue-router'

export type TaskState = 'pending' | 'in_progress' | 'complete'

export interface Task {
  id: string
  name: string
  description: string
  categoryId: number
  icon: string
  exp: number
  level: number
  progress: number
  state: TaskState
  durationMinutes: number
  daysOfWeek: string[] // ['Mon', 'Tue', ...]
  timeOfDay: string // 'HH:mm'
  color: string // Tailwind classes
  startDate?: Date | null
  endDate?: Date | null
  createdAt?: Date
}

export const useTaskStore = defineStore('task', () => {
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const tasks = ref<Task[]>([])

  const createTask = (
    taskInput: Partial<Omit<Task, 'id' | 'createdAt'>> & { name?: string },
  ): Task => {
    const newTask: Task = {
      id: nanoid(),
      name: taskInput.name || '',
      icon: taskInput.icon || '🦓',
      exp: taskInput.exp || 0,
      level: taskInput.level || 1,
      description: taskInput.description || '',
      progress: taskInput.progress ?? 0,
      state: taskInput.state ?? 'pending',
      durationMinutes: taskInput.durationMinutes ?? 3,
      daysOfWeek: taskInput.daysOfWeek ?? ['Mon'],
      timeOfDay: taskInput.timeOfDay ?? '05:00',
      categoryId: taskInput.categoryId ?? 0,
      color: taskInput.color ?? 'bg-red-200',
      createdAt: new Date(),
      startDate: taskInput.startDate ?? null,
      endDate: taskInput.endDate ?? null,
    }

    tasks.value.push(newTask)
    saveHabitsToLocalStorage()
    return newTask
  }

  const updateTask = (id: number, updates: Partial<Task>) => {
    const index = tasks.value.findIndex((t) => t.id === id.toString())
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
      saveHabitsToLocalStorage()
    }
  }

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((t) => t.id !== id)
    saveHabitsToLocalStorage()
    const router = useRouter()
    router.push('/')
  }

  const incrementTaskExp = async (id: number, amount: number) => {
    const task = tasks.value.find((t) => t.id === id.toString())
    if (task) {
      task.exp += amount

      // Optional: Auto level-up every 100 EXP
      const levelThreshold = 100
      while (task.exp >= levelThreshold) {
        // await new Promise((r) => setTimeout(r, 2000))
        task.level++
        task.exp -= levelThreshold
      }
      saveHabitsToLocalStorage()
    }
  }

  const getTasksForToday = () => {
    const today = new Date()
    const todayStr = dayMap[today.getDay()]
    return tasks.value.filter((task) => task.daysOfWeek.includes(todayStr))
  }

  const getTasksForWeek = () => {
    const today = new Date()
    const dayIndex = today.getDay() // 0 (Sun) to 6 (Sat)
    const weekDays: string[] = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - dayIndex + i)
      const weekdayStr = dayMap[date.getDay()]
      if (!weekDays.includes(weekdayStr)) weekDays.push(weekdayStr)
    }

    return tasks.value.filter((task) => task.daysOfWeek.some((day) => weekDays.includes(day)))
  }

  const getTaskById = (id: string | number): Task | undefined =>
    tasks.value.find((t) => t.id === id)

  const saveHabitsToLocalStorage = () => {
    localStorage.setItem('habits', JSON.stringify(tasks.value))
  }

  const loadHabitsFromLocalStorage = () => {
    const saved = localStorage.getItem('habits')
    if (saved) {
      const parsed = JSON.parse(saved)
      tasks.value = parsed
    } else {
      // If no saved data then we need to send them to the Intro Screen
    }
  }

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getTasksForToday,
    getTasksForWeek,
    incrementTaskExp,
    loadHabitsFromLocalStorage,
    saveHabitsToLocalStorage,
  }
})

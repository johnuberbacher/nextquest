import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'

export type TaskState = 'pending' | 'in_progress' | 'complete'

export interface Task {
  id: string
  name: string
  description: string
  categoryId: number | string
  icon: string
  exp: number
  level: number
  progress: number
  state: TaskState
  durationMinutes: number
  daysOfWeek: string[] // ['Mon', 'Tue', ...]
  timeOfDay: string // 'HH:mm'
  color: string // Tailwind class like 'bg-red-500'
  startDate?: Date | null
  endDate?: Date | null
  createdAt?: Date
}

export const useTaskStore = defineStore('task', () => {
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  // const tasks = ref<Task[]>([])
  const tasks = ref<Task[]>([
    {
      id: '15',
      name: '',
      description: 'Something on Weekdays',
      categoryId: 1,
      icon: '🧘‍♀️',
      exp: 0,
      level: 1,
      progress: 0,
      state: 'pending',
      durationMinutes: 30,
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeOfDay: '07:00',
      color: 'bg-yellow-50 dark:bg-yellow-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '14',
      name: '',
      description: 'Something on Weekdays',
      categoryId: 1,
      icon: '🧘‍♀️',
      exp: 0,
      level: 1,
      progress: 0,
      state: 'pending',
      durationMinutes: 30,
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeOfDay: '07:00',
      color: 'bg-yellow-50 dark:bg-yellow-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '13',
      name: '',
      description: 'Something on Weekdays',
      categoryId: 1,
      icon: '🧘‍♀️',
      exp: 0,
      level: 1,
      progress: 0,
      state: 'pending',
      durationMinutes: 30,
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeOfDay: '07:00',
      color: 'bg-yellow-50 dark:bg-yellow-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '12',
      name: '',
      description: 'Something on Weekdays',
      categoryId: 1,
      icon: '🧘‍♀️',
      exp: 0,
      level: 1,
      progress: 0,
      state: 'pending',
      durationMinutes: 30,
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeOfDay: '07:00',
      color: 'bg-yellow-50 dark:bg-yellow-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '11',
      name: '',
      description: 'Something on Weekdays',
      categoryId: 1,
      icon: '🧘‍♀️',
      exp: 0,
      level: 1,
      progress: 0,
      state: 'pending',
      durationMinutes: 30,
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeOfDay: '07:00',
      color: 'bg-yellow-50 dark:bg-yellow-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '1',
      name: '',
      description: 'Something on Weekdays',
      categoryId: 1,
      icon: '🧘‍♀️',
      exp: 0,
      level: 1,
      progress: 0,
      state: 'pending',
      durationMinutes: 30,
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeOfDay: '07:00',
      color: 'bg-yellow-50 dark:bg-yellow-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '2',
      name: 'Creative Writing',
      description: 'Unleash your imagination with daily writing exercises.',
      categoryId: 2,
      icon: '✍️',
      exp: 78,
      level: 4,
      progress: 40,
      state: 'in_progress',
      durationMinutes: 45,
      daysOfWeek: ['Tue', 'Wed', 'Thu'],
      timeOfDay: '10:00',
      color: 'bg-purple-50 dark:bg-purple-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '3',
      name: 'Game Development',
      description: 'Build the next great game with some coding and debugging.',
      categoryId: 3,
      icon: '🎮',
      exp: 92,
      level: 16,
      progress: 80,
      state: 'in_progress',
      durationMinutes: 90,
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      timeOfDay: '13:00',
      color: 'bg-indigo-50 dark:bg-indigo-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '4',
      name: 'Guitar Practice',
      description: 'Practice your guitar skills with new tunes and techniques.',
      categoryId: 4,
      icon: '🎸',
      exp: 0,
      level: 1,
      progress: 50,
      state: 'in_progress',
      durationMinutes: 60,
      daysOfWeek: ['Mon', 'Tue', 'Wed'],
      timeOfDay: '16:00',
      color: 'bg-orange-50 dark:bg-orange-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '5',
      name: 'Reading',
      description: 'Escape into a new book and enjoy some quiet time.',
      categoryId: 5,
      icon: '📚',
      exp: 0,
      level: 1,
      progress: 20,
      state: 'pending',
      durationMinutes: 40,
      daysOfWeek: ['Tue', 'Wed', 'Fri'],
      timeOfDay: '20:00',
      color: 'bg-pink-50 dark:bg-pink-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '6',
      name: 'Cooking Class',
      description: 'Learn how to make new dishes in this weekly cooking session.',
      categoryId: 6,
      icon: '🍳',
      exp: 0,
      level: 1,
      progress: 0,
      state: 'pending',
      durationMinutes: 90,
      daysOfWeek: ['Wed', 'Sat'],
      timeOfDay: '11:00',
      color: 'bg-teal-50 dark:bg-teal-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
  ])

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
      categoryId: taskInput.categoryId ?? 'NULL',
      color: taskInput.color ?? 'bg-red-200',
      createdAt: new Date(),
      startDate: taskInput.startDate ?? null,
      endDate: taskInput.endDate ?? null,
    }

    tasks.value.push(newTask)
    return newTask
  }

  const updateTask = (id: number, updates: Partial<Task>) => {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  const incrementTaskExp = async (id: number, amount: number) => {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.exp += amount

      // Optional: Auto level-up every 100 EXP
      const levelThreshold = 100
      while (task.exp >= levelThreshold) {
        // await new Promise((r) => setTimeout(r, 2000))
        task.level++
        task.exp -= levelThreshold
      }
    }
  }

  const getTasksForToday = () => {
    const today = new Date()
    const todayStr = dayMap[today.getDay()]
    console.log(todayStr)
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

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getTasksForToday,
    getTasksForWeek,
    incrementTaskExp,
  }
})

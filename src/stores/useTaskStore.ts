import { defineStore } from 'pinia'
import { ref } from 'vue'
import { nanoid } from 'nanoid'

export type TaskState = 'pending' | 'in_progress' | 'complete'

export interface Task {
  id: string
  name: string
  description?: string
  categoryId?: number
  icon: string
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
  // const tasks = ref<Task[]>([])

  const tasks = ref<Task[]>([
    {
      id: '1',
      name: 'Task 1',
      description: 'This is a sample task description',
      categoryId: 0,
      icon: '🦓',
      progress: 0,
      state: 'pending',
      durationMinutes: 30,
      daysOfWeek: ['Mon', 'Wed', 'Fri'],
      timeOfDay: '09:00',
      color: 'bg-red-50 dark:bg-red-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '2',
      name: 'Do some coding',
      description: 'This is a sample task description',
      categoryId: 2,
      icon: '🐸',
      progress: 50,
      state: 'in_progress',
      durationMinutes: 45,
      daysOfWeek: ['Tue', 'Thu'],
      timeOfDay: '14:00',
      color: 'bg-green-50 dark:bg-green-200',
      createdAt: new Date(),
      startDate: null,
      endDate: null,
    },
    {
      id: '3',
      name: 'Task 3',
      description: 'This is a sample task description',
      categoryId: 4,
      icon: '😀',
      progress: 100,
      state: 'complete',
      durationMinutes: 60,
      daysOfWeek: ['Mon', 'Wed'],
      timeOfDay: '18:00',
      color: 'bg-blue-50 dark:bg-blue-200',
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
      description: taskInput.description || '',
      progress: taskInput.progress ?? 0,
      state: taskInput.state ?? 'pending',
      durationMinutes: taskInput.durationMinutes ?? 3,
      daysOfWeek: taskInput.daysOfWeek ?? ['Mon'],
      timeOfDay: taskInput.timeOfDay ?? '05:00',
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

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  const getTaskById = (id: number): Task | undefined => tasks.value.find((t) => t.id === id)

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
  }
})

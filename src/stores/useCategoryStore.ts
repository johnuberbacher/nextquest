import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Category {
  id: number
  name: string
  description: string
  icon: string
  emoji: Array<string>
  createdAt: Date
  startDate: Date | null
  endDate: Date | null
  suggestions: Array<string>
  relatedCategories: Array<number>
}

export const useCategoryStore = defineStore('category', () => {
  const selectedCategoryId = ref<number>()
  const categories = ref<Category[]>([
    {
      id: 0,
      name: 'Work',
      description: 'Tasks related to your job or career',
      icon: '💼',
      emoji: ['🖥️', '🗂️', '📊', '📅', '🕴️', '📈', '📎', '📇', '🗃️', '🏢'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Check and respond to important emails',
        'Plan tomorrow’s work tasks today',
        'Spend 30 minutes on a priority project',
        'Review weekly goals on Friday',
        'Block time for deep work sessions',
      ],
      relatedCategories: [12, 13, 37], // Productivity, Focus, Planning
    },
    {
      id: 1,
      name: 'Personal',
      description: 'Personal development or routines',
      icon: '🏠',
      emoji: ['🛋️', '📆', '🧴', '💬', '📞', '🎨', '🧩', '🧵', '🪴', '💡'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Call a friend or family member',
        'Declutter one small space',
        'Take 10 minutes for self-reflection',
        'Do something that makes you smile',
        'Practice a hobby you enjoy',
      ],
      relatedCategories: [9, 24, 26], // Mindfulness, Mental Health, Hobbies
    },
    {
      id: 2,
      name: 'Fitness',
      description: 'Exercise and physical activity',
      icon: '🏋️‍♂️',
      emoji: ['🤸‍♂️', '🏃‍♀️', '🏃', '🧘', '🚴', '⛹️', '💪', '🧗', '🚶', '🏃‍♂️'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Do a 20-minute workout',
        'Go for a jog or walk',
        'Try a new exercise routine',
        'Stretch for 5 minutes before bed',
        'Complete a full-body strength session',
      ],
      relatedCategories: [20, 21, 6], // Stretching, Steps, Hydration
    },
    {
      id: 3,
      name: 'Health',
      description: 'General health and wellness habits',
      icon: '🩺',
      emoji: ['🧬', '🧪', '💊', '🧼', '🩻', '🦠', '🧠', '🦴', '🫀', '🩹'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Schedule health checkups',
        'Take daily vitamins',
        'Track your mood and energy',
        'Take breaks during long tasks',
        'Practice good posture',
      ],
      relatedCategories: [5, 24, 22], // Nutrition, Mental Health, Hygiene
    },
    {
      id: 4,
      name: 'Sleep',
      description: 'Sleep schedules and improvement',
      icon: '🛌',
      emoji: ['🌙', '😴', '🛏️', '🕯️', '🧸', '📴', '🧘‍♀️', '📓', '🔕', '🧦'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Go to bed at the same time',
        'Avoid screens before bed',
        'Establish a nighttime routine',
        'Keep a sleep journal',
        'Wake up at a consistent hour',
      ],
      relatedCategories: [9, 3, 20], // Mindfulness, Health, Stretching
    },
    {
      id: 5,
      name: 'Nutrition',
      description: 'Healthy eating and food tracking',
      icon: '🥗',
      emoji: ['🍎', '🥦', '🍠', '🥒', '🍇', '🥥', '🥬', '🥕', '🍓', '🥣'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Eat 5 servings of vegetables',
        'Plan meals ahead',
        'Avoid sugary snacks',
        'Drink a smoothie',
        'Track food intake daily',
      ],
      relatedCategories: [6, 18, 3], // Hydration, Cooking, Health
    },
    {
      id: 6,
      name: 'Hydration',
      description: 'Water and fluid intake',
      icon: '💧',
      emoji: ['🚰', '🥤', '🫗', '🍶', '🧊', '🫙', '🥛', '🧃', '🫧', '🌊'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Drink 8 glasses of water',
        'Start the day with a glass',
        'Keep a refillable bottle nearby',
        'Set hourly hydration reminders',
        'Track water intake',
      ],
      relatedCategories: [5, 2, 20], // Nutrition, Fitness, Stretching
    },
    {
      id: 7,
      name: 'Learning',
      description: 'Education and skill-building',
      icon: '📚',
      emoji: ['🧠', '📝', '🎓', '💡', '📖', '🎥', '📘', '🔍', '📜', '🧑‍🏫'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Take an online course',
        'Watch a documentary',
        'Practice a new skill',
        'Review notes from a past lesson',
        'Read an educational article',
      ],
      relatedCategories: [8, 35, 27], // Reading, Language, Creativity
    },
    {
      id: 8,
      name: 'Reading',
      description: 'Reading books or articles',
      icon: '📖',
      emoji: ['📚', '📘', '📗', '📙', '📕', '📓', '📒', '🔖', '📑', '🧾'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Read a book for 10 minutes',
        'Finish one chapter',
        'Explore a new genre',
        'Read before bed',
        'Join a reading challenge',
      ],
      relatedCategories: [7, 27, 9], // Learning, Creativity, Mindfulness
    },
    {
      id: 9,
      name: 'Mindfulness',
      description: 'Meditation and awareness practices',
      icon: '🧘‍♂️',
      emoji: ['🌿', '🌸', '💭', '🕯️', '🧘', '🔔', '🍵', '📿', '🌼', '💫'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Meditate for 5 minutes',
        'Focus on deep breathing',
        'Do a body scan meditation',
        'Practice gratitude',
        'Be present during routine tasks',
      ],
      relatedCategories: [4, 24, 1], // Sleep, Mental Health, Personal
    },
    {
      id: 10,
      name: 'Journaling',
      description: 'Writing thoughts or reflections',
      icon: '📓',
      emoji: ['✍️', '🖋️', '📝', '📔', '📒', '🗒️', '📖', '📄', '💭', '📌'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Write morning thoughts',
        'Reflect on your day',
        'Note 3 things you learned',
        'List goals for tomorrow',
        'Explore your emotions',
      ],
      relatedCategories: [11, 9, 38], // Gratitude, Mindfulness, Goals
    },
    {
      id: 11,
      name: 'Gratitude',
      description: 'Practicing gratitude daily',
      icon: '🙏',
      emoji: ['💖', '😊', '🌈', '💐', '🌞', '🎁', '🫶', '💌', '💭', '💬'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        "List 3 things you're grateful for",
        'Thank someone sincerely',
        'Reflect on a recent joy',
        'Write a gratitude letter',
        'Notice small daily blessings',
      ],
      relatedCategories: [10, 9, 24], // Journaling, Mindfulness, Mental Health
    },
    {
      id: 12,
      name: 'Productivity',
      description: 'Efficiency and task completion',
      icon: '📈',
      emoji: ['✅', '🗂️', '📋', '🧠', '🔁', '📆', '⏱️', '📎', '🗓️', '🧩'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Use a task list',
        'Follow the Pomodoro technique',
        'Prioritize top 3 tasks',
        'Batch similar tasks',
        'Declutter workspace',
      ],
      relatedCategories: [0, 13, 37], // Work, Focus, Planning
    },
    {
      id: 13,
      name: 'Focus',
      description: 'Concentration and deep work',
      icon: '🎯',
      emoji: ['🧠', '📵', '🛑', '🧘‍♂️', '⏳', '📍', '🚫', '🔇', '📘', '👓'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Turn off notifications',
        'Work in a quiet space',
        'Set a focus timer',
        'Take regular breaks',
        'Track distractions',
      ],
      relatedCategories: [12, 37, 9], // Productivity, Planning, Mindfulness
    },
    {
      id: 14,
      name: 'Budgeting',
      description: 'Tracking income and expenses',
      icon: '💵',
      emoji: ['📊', '📉', '💳', '💰', '🧾', '📈', '🗃️', '💹', '🪙', '📇'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Review weekly spending',
        'Set a daily budget',
        'Track all expenses',
        'Check bank balances',
        'Use a budgeting app',
      ],
      relatedCategories: [15, 16, 38], // Saving, Spending, Goals
    },
    {
      id: 15,
      name: 'Saving',
      description: 'Saving money or cutting costs',
      icon: '🏦',
      emoji: ['💸', '💰', '🪙', '🔒', '📉', '📈', '🏧', '💼', '💳', '🧾'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Transfer to savings',
        'Skip one non-essential purchase',
        'Review subscriptions',
        'Meal prep instead of eating out',
        'Set a savings goal',
      ],
      relatedCategories: [14, 16, 18], // Budgeting, Spending, Cooking
    },
    {
      id: 16,
      name: 'Spending',
      description: 'Being mindful of purchases',
      icon: '🛍️',
      emoji: ['🛒', '💳', '📦', '🧾', '🪙', '🛍️', '💰', '💸', '🎁', '📱'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Pause before a purchase',
        'Track impulse buys',
        'Stick to a shopping list',
        'Use cash over card',
        'Limit online shopping',
      ],
      relatedCategories: [14, 15, 32], // Budgeting, Saving, Errands
    },
    {
      id: 17,
      name: 'Cleaning',
      description: 'Tidying and organizing spaces',
      icon: '🧹',
      emoji: ['🧽', '🪣', '🧼', '🗑️', '🛁', '🧺', '🧴', '🧻', '🪠', '🪟'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Clean one room',
        'Wipe surfaces',
        'Organize a drawer',
        'Do a quick 10-minute tidy',
        'Wash dishes immediately',
      ],
      relatedCategories: [33, 32, 5], // Home Projects, Errands, Nutrition
    },
    {
      id: 18,
      name: 'Cooking',
      description: 'Home cooking and meal prep',
      icon: '🍳',
      emoji: ['🍽️', '🧂', '🍲', '🍝', '🥘', '🫕', '🥣', '🥗', '🧄', '🫑'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Cook one homemade meal',
        'Try a new recipe',
        'Prep lunch in advance',
        'Use leftovers creatively',
        'Clean as you cook',
      ],
      relatedCategories: [5, 15, 6], // Nutrition, Saving, Hydration
    },
    {
      id: 19,
      name: 'Digital Detox',
      description: 'Limiting screen or social media time',
      icon: '📵',
      emoji: ['📴', '📱', '📵', '📶', '🛑', '🧘‍♂️', '🌿', '📚', '🪷', '⏳'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'No phone for 1 hour',
        'Log out of social media',
        'Delete one app',
        'Spend a day offline',
        'Do a screen-free activity',
      ],
      relatedCategories: [9, 4, 13], // Mindfulness, Sleep, Focus
    },
    {
      id: 20,
      name: 'Stretching',
      description: 'Mobility and flexibility work',
      icon: '🤸‍♂️',
      emoji: ['🧘‍♀️', '🧎‍♂️', '🦵', '🤸‍♀️', '🧍‍♂️', '🪢', '🕺', '🏃‍♀️', '🛀', '💪'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Morning stretch routine',
        'Stretch after workouts',
        'Try yoga poses',
        'Loosen tight muscles',
        'Stretch during work breaks',
      ],
      relatedCategories: [2, 21, 6], // Fitness, Steps, Hydration
    },
    {
      id: 21,
      name: 'Steps',
      description: 'Walking or step count tracking',
      icon: '🚶‍♂️',
      emoji: ['🚶‍♀️', '👟', '🏃', '📉', '📈', '🗺️', '⏱️', '⛰️', '🌳', '🌇'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Take a 10-minute walk',
        'Park farther away',
        'Walk after meals',
        'Use stairs over elevator',
        'Track daily steps',
      ],
      relatedCategories: [2, 20, 31], // Fitness, Stretching, Nature
    },
    {
      id: 22,
      name: 'Hygiene',
      description: 'Daily grooming and cleanliness',
      icon: '🧼',
      emoji: ['🛁', '🧽', '🪥', '🧴', '🚿', '🧤', '🧻', '🧹', '🧺', '🪒'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Brush teeth twice daily',
        'Shower regularly',
        'Trim nails',
        'Clean personal items',
        'Change towels often',
      ],
      relatedCategories: [3, 23, 24], // Health, Skin Care, Mental Health
    },
    {
      id: 23,
      name: 'Skin Care',
      description: 'Routine skin care habits',
      icon: '🧴',
      emoji: ['🪞', '🧖‍♀️', '🧼', '💧', '🌿', '🛁', '🪮', '🧽', '👒', '🌞'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Wash face morning and night',
        'Apply moisturizer',
        'Use sunscreen',
        'Remove makeup',
        'Try a face mask weekly',
      ],
      relatedCategories: [22, 3, 24], // Hygiene, Health, Mental Health
    },
    {
      id: 24,
      name: 'Mental Health',
      description: 'Supportive mental wellness habits',
      icon: '🧠',
      emoji: ['🧘', '🛌', '📓', '💬', '💖', '🎧', '🌸', '☀️', '💭', '🌙'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Talk to a friend',
        'Practice mindfulness',
        'Seek professional help',
        'Take mental health days',
        'Limit negative self-talk',
      ],
      relatedCategories: [9, 11, 22], // Mindfulness, Gratitude, Hygiene
    },
    {
      id: 25,
      name: 'Social',
      description: 'Connecting with others',
      icon: '🗣️',
      emoji: ['📞', '💬', '🤗', '🤝', '👥', '📱', '🫂', '🧑‍🤝‍🧑', '🥂', '🎉'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Call someone',
        'Send a kind message',
        'Make future plans',
        'Have a meaningful conversation',
        'Attend a social event',
      ],
      relatedCategories: [1, 34, 28], // Personal, Relationships, Volunteering
    },
    {
      id: 26,
      name: 'Hobbies',
      description: 'Time spent on hobbies or crafts',
      icon: '🎨',
      emoji: ['🧶', '🧵', '🎭', '📷', '🎮', '🎼', '📚', '🎬', '🔨', '📖'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Spend 30 mins on a hobby',
        'Learn a new craft',
        'Work on a long-term project',
        'Join a hobby group',
        'Organize hobby supplies',
      ],
      relatedCategories: [1, 27, 7], // Personal, Creativity, Learning
    },
    {
      id: 27,
      name: 'Creativity',
      description: 'Writing, drawing, creating',
      icon: '✏️',
      emoji: ['📝', '🖌️', '🧠', '💡', '🎨', '🎭', '📓', '🧩', '📐', '🧃'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Draw something simple',
        'Write a short story',
        'Brainstorm ideas',
        'Create without judging',
        'Start a new creative challenge',
      ],
      relatedCategories: [26, 7, 8], // Hobbies, Learning, Reading
    },
    {
      id: 28,
      name: 'Volunteering',
      description: 'Helping others or your community',
      icon: '🤝',
      emoji: ['❤️', '🎁', '🧺', '🏘️', '👥', '🆘', '🌍', '👐', '🤗', '📦'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Donate unused items',
        'Help a neighbor',
        'Join a volunteer group',
        'Support a local cause',
        'Offer skills for free',
      ],
      relatedCategories: [25, 34, 29], // Social, Relationships, Spirituality
    },
    {
      id: 29,
      name: 'Spirituality',
      description: 'Prayer or spiritual practices',
      icon: '🕊️',
      emoji: ['🙏', '📿', '🛐', '🧘‍♂️', '🌅', '🕯️', '📖', '💫', '🧿', '🌌'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Spend time in prayer',
        'Read spiritual texts',
        'Attend a service',
        'Reflect on purpose',
        'Practice compassion',
      ],
      relatedCategories: [9, 28, 24], // Mindfulness, Volunteering, Mental Health
    },
    {
      id: 30,
      name: 'Pets',
      description: 'Caring for animals or pets',
      icon: '🐶',
      emoji: ['🐕', '🐾', '🦴', '🦮', '🐱', '🐕‍🦺', '🦜', '🛁', '🧽', '🦴'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Walk your pet',
        'Play for 10 minutes',
        'Groom your pet',
        'Clean their space',
        'Give a treat',
      ],
      relatedCategories: [21, 17, 31], // Steps, Cleaning, Nature
    },
    {
      id: 31,
      name: 'Nature',
      description: 'Spending time outdoors',
      icon: '🌳',
      emoji: ['🌿', '🍃', '🌞', '🌼', '🌻', '🪵', '🍂', '🌲', '🏞️', '🦋'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Take a walk outside',
        'Sit in the sun',
        'Visit a park',
        'Observe wildlife',
        'Do outdoor meditation',
      ],
      relatedCategories: [21, 30, 9], // Steps, Pets, Mindfulness
    },
    {
      id: 32,
      name: 'Errands',
      description: 'Daily to-dos and responsibilities',
      icon: '🧾',
      emoji: ['🛒', '📦', '🏪', '💊', '📬', '📅', '🚶', '📇', '📋', '🗂️'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Buy groceries',
        'Pick up supplies',
        'Visit the post office',
        'Refill prescriptions',
        'Schedule appointments',
      ],
      relatedCategories: [16, 17, 33], // Spending, Cleaning, Home Projects
    },
    {
      id: 33,
      name: 'Home Projects',
      description: 'DIY or improvement tasks',
      icon: '🛠️',
      emoji: ['🪚', '🧰', '🔩', '🔧', '🔨', '🧱', '🪜', '🏠', '🧽', '📐'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Fix one thing',
        'Paint or touch up',
        'Organize a room',
        'Install something new',
        'Declutter storage',
      ],
      relatedCategories: [17, 32, 5], // Cleaning, Errands, Nutrition
    },
    {
      id: 34,
      name: 'Relationships',
      description: 'Improving personal connections',
      icon: '❤️',
      emoji: ['🤝', '💬', '👨‍👩‍👧', '👫', '💖', '🥰', '👂', '📞', '💌', '🫂'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Express appreciation',
        'Spend quality time',
        'Listen actively',
        'Resolve a conflict',
        'Support a loved one',
      ],
      relatedCategories: [25, 24, 1], // Social, Mental Health, Personal
    },
    {
      id: 35,
      name: 'Language',
      description: 'Learning or practicing a language',
      icon: '🈶',
      emoji: ['🗣️', '📘', '🔤', '✍️', '🧠', '🗯️', '🈚', '📚', '🈳', '📖'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Learn 5 new words',
        'Use a language app',
        'Watch in the target language',
        'Practice speaking aloud',
        'Label items around you',
      ],
      relatedCategories: [7, 8, 27], // Learning, Reading, Creativity
    },
    {
      id: 36,
      name: 'Music',
      description: 'Playing or listening mindfully',
      icon: '🎵',
      emoji: ['🎧', '🎶', '🎹', '🥁', '🎸', '🎤', '📻', '🎼', '🪕', '🪗'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Listen to a new genre',
        'Play an instrument',
        'Create a playlist',
        'Analyze lyrics',
        'Practice a song',
      ],
      relatedCategories: [27, 26, 9], // Creativity, Hobbies, Mindfulness
    },
    {
      id: 37,
      name: 'Planning',
      description: 'Daily or weekly planning routines',
      icon: '🗓️',
      emoji: ['📝', '📅', '🧠', '🗃️', '🗓️', '📆', '🪪', '🔖', '🪄', '📋'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Plan tomorrow',
        'Set weekly goals',
        'Review calendar',
        'Organize to-dos',
        'Reflect on priorities',
      ],
      relatedCategories: [12, 38, 39], // Productivity, Goals, Reflection
    },
    {
      id: 38,
      name: 'Goals',
      description: 'Reviewing or setting personal goals',
      icon: '🏁',
      emoji: ['🎯', '🏆', '📈', '📊', '🪜', '✍️', '🗺️', '✅', '🌟', '🧭'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Set a new goal',
        'Review progress',
        'Break goals into tasks',
        'Visualize success',
        'Celebrate milestones',
      ],
      relatedCategories: [37, 12, 39], // Planning, Productivity, Reflection
    },
    {
      id: 39,
      name: 'Reflection',
      description: 'Self-review or end-of-day reflection',
      icon: '🔍',
      emoji: ['🧘', '📓', '🛏️', '💭', '📖', '🪞', '🕯️', '🧠', '🕰️', '🫥'],
      createdAt: new Date(),
      startDate: null,
      endDate: null,
      suggestions: [
        'Review what went well',
        'Note lessons learned',
        'Acknowledge feelings',
        'Reflect on choices',
        'Plan for tomorrow',
      ],
      relatedCategories: [9, 10, 38], // Mindfulness, Journaling, Goals
    },
  ])

  const getCategoryById = (id: number) => {
    return categories.value.find((c) => c.id === id) || null
  }

  const selectCategory = (id: number) => {
    selectedCategoryId.value = id
  }

  return {
    selectedCategoryId,
    categories,
    getCategoryById,
    selectCategory,
  }
})

// creating a new task
export interface Task {
  title: string
  details: string
  priority: number
  isCompleted: boolean
  createdAt: number
  updatedAt: number
}

// getting a task by id
export interface TaskWithId extends Task {
  id: number
}

// updating a task by id
export interface UpdateTask {
  id: number
  title?: string
  details?: string
  priority?: number
  updatedAt: number
}

// deleting a task by id
export interface DeleteTask {
  id: number
}

// completing or uncompleting a task by id
export interface CompleteTask {
  id: number
  isCompleted: boolean
}

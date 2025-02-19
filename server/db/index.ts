import { CompleteTask, Task, TaskWithId, UpdateTask } from '../../models/tasks'
import connection from './connection.ts'

const isProduction = process.env.NODE_ENV === 'production'

// create new task
export async function createTask(task: Task, db = connection): Promise<void> {
  await db('tasks').insert({
    title: task.title,
    details: task.details,
    priority: task.priority,
    is_completed: task.isCompleted,
    created_at: isProduction ? new Date(task.createdAt) : task.createdAt,
    updated_at: isProduction ? new Date(task.updatedAt) : task.updatedAt,
  })
}

// get all tasks
export async function getAllTasks(db = connection): Promise<TaskWithId[]> {
  return db('tasks')
    .select(
      'id as id',
      'title as title',
      'details as details',
      'priority as priority',
      'is_completed as isCompleted',
      'created_at as completedAt',
      'updated_at as updatedAt'
    )
    .orderBy('updated_at', 'desc')
}

// get task by id
export async function getTask(
  id: number,
  db = connection
): Promise<TaskWithId> {
  return db('tasks')
    .select(
      'id as id',
      'title as title',
      'details as details',
      'priority as priority',
      'is_completed as isCompleted',
      'created_at as completedAt',
      'updated_at as updatedAt'
    )
    .where('id', id)
    .first()
}

// update task by id
export async function updateTaskById(
  id: number,
  task: Task,
  db = connection
): Promise<void> {
  await db('tasks')
    .where('id', id)
    .update({
      title: task.title,
      details: task.details,
      priority: task.priority,
      is_completed: task.isCompleted,
      created_at: isProduction ? new Date(task.createdAt) : task.createdAt,
      updated_at: isProduction ? new Date(task.updatedAt) : task.updatedAt,
    })
}

// delete task by id
export async function deleteTaskById(
  id: number,
  db = connection
): Promise<void> {
  await db('tasks').where('id', id).del()
}

// complete task by id
export async function completeTaskById(
  id: number,
  taskStatus: CompleteTask,
  db = connection
): Promise<void> {
  await db('tasks')
    .where('id', id)
    .update('is_completed', taskStatus.isCompleted)
}

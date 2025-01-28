import { TaskWithId } from '../../models/tasks'
import connection from './connection.ts'

// create new task

// get all tasks
export async function getAllTasks(db = connection): Promise<TaskWithId[]> {
  return db('tasks').select()
}

// get task by id
export async function getTask(
  id: number,
  db = connection,
): Promise<TaskWithId> {
  return db('tasks').select().where('id', id).first()
}

// update task by id

// delete task by id

// complete task by id

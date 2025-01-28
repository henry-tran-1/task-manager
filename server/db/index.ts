import { TaskWithId } from '../../models/tasks'
import connection from './connection.ts'

// get all tasks
export async function getAllTasks(db = connection): Promise<TaskWithId[]> {
  return db('tasks').select()
}

import { TaskWithId } from '../../models/tasks'
import connection from './connection.ts'

export async function getTasks(db = connection): Promise<TaskWithId[]> {
  return await db('tasks').select()
}

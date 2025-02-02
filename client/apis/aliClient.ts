import request from 'superagent'
import { TaskWithId } from '../../models/tasks'

// retrieve all tasks
export async function getAllTasks() {
  const response = await request.get('/api/v1/tasks')
  if (response.ok) return response.body as TaskWithId[]
  else console.error('Error with GET all tasks request')
}

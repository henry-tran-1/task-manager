import request from 'superagent'
import { CompleteTask, Task, TaskWithId, UpdateTask } from '../../models/tasks'

// retrieve all tasks
export async function getAllTasks() {
  try {
    const response = await request.get('/api/v1/tasks')
    return response.body as TaskWithId[]
  } catch (error) {
    console.error('Error with fetching all tasks', error)
  }
}

// retrieve task by id
export async function getTaskById(id: number) {
  try {
    const response = await request.get(`/api/v1/tasks/${id}`)
    return response.body as TaskWithId
  } catch (error) {
    console.error('Error with fetching task by id', error)
  }
}

// add new task
export async function createTask(task: Task) {
  try {
    await request.post('/api/v1/tasks').send(task)
  } catch (error) {
    console.error('Error with creating new task', error)
  }
}

// update task by id
export async function updateTaskById(task: UpdateTask) {
  try {
    await request.put(`/api/v1/tasks/${task.id}`).send(task)
  } catch (error) {
    console.error('Error with updating task by id', error)
  }
}

// complete task by id
export async function completeTaskById(taskStatus: CompleteTask) {
  const response = await request
    .patch(`/api/v1/tasks/${taskStatus.id}`)
    .send(taskStatus)
  if (!response.ok) {
    throw new Error('Failed to complete task')
  }
  return response.body
}

// delete task by id
export async function deleteTaskById(id: number) {
  try {
    await request.delete(`/api/v1/tasks/${id}`)
  } catch (error) {
    console.error('Error with deleting task by id', error)
  }
}

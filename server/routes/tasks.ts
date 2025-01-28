import { Router } from 'express'
import * as db from '../db/index'
import { CompleteTask, Task, TaskWithId } from '../../models/tasks'

const router = Router()

// add new task
// POST /api/v1/tasks
router.post('/', async (req, res) => {
  const task: Task = req.body
  try {
    await db.createTask(task)
    res.status(201).json({ message: 'Task added successfully' })
  } catch (error) {
    console.error('Error in POST /tasks', error)
    res.status(500).json({ message: 'Unable to add new task' })
  }
})

// get all tasks
// GET /api/v1/tasks
router.get('/', async (req, res) => {
  try {
    const tasks: TaskWithId[] = await db.getAllTasks()
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error in GET /tasks', error)
    res.status(500).json({ message: 'Unable to retrieve all tasks' })
  }
})

// get task by id
// GET /api/v1/tasks/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const task: TaskWithId = await db.getTask(id)
    res.status(200).json(task)
  } catch (error) {
    console.error('Error in GET /tasks/:id', error)
    res.status(500).json({ message: 'Unable to retrieve task by id' })
  }
})

// update task by id
// PUT /api/v1/tasks/:id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const task: Task = req.body
  try {
    await db.updateTaskById(id, task)
    res.status(204).json({ message: 'Task updated successfully' })
  } catch (error) {
    console.error('Error in PUT /tasks/:id', error)
    res.status(500).json({ message: 'Unable to update task by id' })
  }
})

// delete task by id
// DELETE /api/v1/tasks/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteTaskById(id)
    res.status(204).json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /tasks/:id', error)
    res.status(500).json({ message: 'Unable to delete task by id' })
  }
})

// complete task by id
// PATCH /api/v1/tasks/:id
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const taskStatus: CompleteTask = req.body
  try {
    await db.completeTaskById(id, taskStatus)
    res.status(204).json({ message: 'Task status updated successfully' })
  } catch (error) {
    console.error('Error in PATCH /tasks/:id', error)
    res.status(500).json({ message: 'Unable to complete task by id' })
  }
})

export default router

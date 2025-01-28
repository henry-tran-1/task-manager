import { Router } from 'express'
import * as db from '../db/index'

const router = Router()

// get all tasks
// GET /api/v1/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()
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
    const task = await db.getTask(id)
    res.status(200).json(task)
  } catch (error) {
    console.error('Error in GET /tasks/:id', error)
    res.status(500).json({ message: 'Unable to retrieve task by id' })
  }
})

export default router

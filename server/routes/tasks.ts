import { Router } from 'express'
import * as db from '../db/index'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()
    res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to retrieve all tasks' })
  }
})

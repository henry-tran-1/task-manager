import { useState } from 'react'
import useCreateTask from '../hooks/useCreateTask'

export default function AddTaskForm() {
  // state to handle form input
  const [formState, setFormState] = useState({
    title: '',
    details: '',
    priority: 1,
    isCompleted: false,
    createdAt: 0,
    updatedAt: 0,
  })

  // mutation hook to add task
  const addTask = useCreateTask()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTask.mutate(formState)
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="title"
          id="title"
          type="text"
          placeholder="Add a new task"
          value={formState.title}
          className="text-lg"
        />
        <textarea
          onChange={handleChange}
          name="details"
          id="details"
          placeholder="Add a short description"
          rows={1}
          value={formState.details}
          className="text-lg"
        />
        <select
          onChange={handleChange}
          name="priority"
          id="priority"
          className="text-lg"
        >
          <option>Low</option>
          <option>Med</option>
          <option>High</option>
        </select>
      </form>
    </section>
  )
}

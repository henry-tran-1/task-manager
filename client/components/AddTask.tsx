import { useState } from 'react'
import useCreateTask from '../hooks/useCreateTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

interface Props {
  displayWindowState: boolean
}

export default function AddTask({ displayWindowState }: Props) {
  // state to handle form input
  const [formState, setFormState] = useState({
    title: '',
    details: '',
    priority: 2,
    isCompleted: false,
    createdAt: 0,
    updatedAt: 0,
  })
  // state to handle details and priority appearing
  const [displayFullform, setDisplayFullform] = useState(false)

  // mutation hook to add task
  const addTask = useCreateTask()

  // handles submitting form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTask.mutate(formState)
  }
  // handles form changes
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }))
  }

  // toggles displaying full form
  const toggleDisplayFullform = (inFocus: boolean) => {
    setDisplayFullform(() => inFocus)
  }

  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} bg-barGray  border-b border-borderGray`}
    >
      <form onSubmit={handleSubmit} className="flex justify-around">
        <button type="submit" className={` text-lg`}>
          <FontAwesomeIcon icon={faCirclePlus} className="text-4xl" />
        </button>
        <div className="flex flex-col w-3/5 m-2">
          <input
            onChange={handleChange}
            onFocus={() => toggleDisplayFullform(true)}
            name="title"
            id="title"
            type="text"
            placeholder="Add new task"
            value={formState.title}
            className="text-lg text-center border bg-tabGray border-borderGray "
          />

          <input
            onChange={handleChange}
            name="details"
            id="details"
            type="text"
            placeholder="Add a short description"
            value={formState.details}
            className={`${displayFullform ? 'flex' : 'hidden'} text-lg text-center bg-tabGray`}
          />
        </div>
        <div>
          <select
            onChange={handleChange}
            name="priority"
            id="priority"
            className={`${displayFullform ? 'flex' : `hidden`} text-lg bg-tabGray`}
          >
            <option>Low</option>
            <option>Med</option>
            <option>High</option>
          </select>
        </div>
      </form>
    </section>
  )
}

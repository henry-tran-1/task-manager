import { useState } from 'react'
import useCreateTask from '../hooks/useCreateTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

interface Props {
  displayWindowState: boolean
}

export default function AddTask({ displayWindowState }: Props) {
  // state to handle form input
  const defaultForm = {
    title: '',
    details: '',
    priority: 2,
    isCompleted: false,
    createdAt: 0,
    updatedAt: 0,
  }
  const [formState, setFormState] = useState(defaultForm)
  // state to handle details and priority appearing
  const [displayFullform, setDisplayFullform] = useState(false)

  // mutation hook to add task
  const addTask = useCreateTask()

  // handles submitting form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTask.mutate(formState)
    setFormState(() => defaultForm)
  }
  // handles form changes
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    // for priority, change string to number
    if (name === 'priority') {
      const valueNum = Number(value)
      setFormState((prev) => ({
        ...prev,
        [name]: valueNum,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }))
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }))
    }
  }

  // toggles displaying full form
  const toggleDisplayFullform = (inFocus: boolean) => {
    setDisplayFullform(() => inFocus)
  }

  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} bg-barGray  border-b border-borderGray`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-around"
      >
        <div className={`${displayFullform ? 'flex flex-col' : 'hidden'} `}>
          <label className="flex items-center cursor-pointer">
            <input
              onChange={handleChange}
              type="radio"
              name="priority"
              value="1"
              className="hidden peer"
              defaultChecked={formState.priority === 1}
            />
            <span className="w-5 h-5 bg-white border-2 border-black rounded-sm peer-checked:bg-black peer-checked:border-black"></span>
            <span className="ml-1">low</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              onChange={handleChange}
              type="radio"
              name="priority"
              value="2"
              className="hidden peer"
              defaultChecked={formState.priority === 2}
            />
            <span className="w-5 h-5 bg-white border-2 border-black rounded-sm peer-checked:bg-black "></span>
            <span className="ml-1">med</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              onChange={handleChange}
              type="radio"
              name="priority"
              value="3"
              className="hidden peer"
              defaultChecked={formState.priority === 3}
            />
            <span className="w-5 h-5 bg-white border-2 border-black rounded-sm peer-checked:bg-black peer-checked:border-black"></span>
            <span className="ml-1">high</span>
          </label>
        </div>

        <div className="flex flex-col w-[60%] m-2">
          <input
            onChange={handleChange}
            onFocus={() => toggleDisplayFullform(true)}
            name="title"
            id="title"
            type="text"
            placeholder="Add new task"
            value={formState.title}
            className="text-base text-center border bg-tabGray border-borderGray "
          />

          <input
            onChange={handleChange}
            name="details"
            id="details"
            type="text"
            placeholder="Add a short description"
            value={formState.details}
            className={`${displayFullform ? 'flex' : 'hidden'} text-base text-center bg-tabGray mt-2`}
          />
        </div>

        <button
          type="submit"
          className={`${displayFullform ? 'flex' : 'hidden'}  text-lg`}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="text-4xl" />
        </button>
      </form>
    </section>
  )
}

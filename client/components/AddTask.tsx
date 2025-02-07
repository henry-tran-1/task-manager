/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react'
import useCreateTask from '../hooks/useCreateTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

interface Props {
  displayWindowState: boolean
  displayFormState: boolean
  onClickDisplayForm: (display: boolean) => void
}

export default function AddTask({
  displayWindowState,
  displayFormState,
  onClickDisplayForm,
}: Props) {
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

  // mutation hook to add task
  const addTask = useCreateTask()

  // handles form submit
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

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`${displayWindowState ? 'block' : 'hidden'} bg-barGray  border-b border-borderGray`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-around p-1"
      >
        {/* left section: priority buttons */}
        <section className={`lg:w-36 flex justify-center -ml-4`}>
          <div className={`${displayFormState ? 'flex' : 'hidden'} `}>
            <div className="flex items-center ">
              <p className={`-rotate-90 text-base`}>Priority</p>
            </div>

            <div className="flex flex-col">
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
          </div>
        </section>

        {/* middle section (input) */}
        <section className="flex flex-col w-[70%] m-2">
          <input
            onChange={handleChange}
            onFocus={() => onClickDisplayForm(true)}
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
            className={`${displayFormState ? 'flex' : 'hidden'} text-base text-center bg-tabGray mt-2`}
          />
        </section>

        {/* right section: add button */}
        <section className="flex justify-center lg:w-16">
          <button
            type="submit"
            className={`${displayFormState ? 'flex' : 'hidden'}  text-lg`}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="text-4xl" />
          </button>
        </section>
      </form>
    </section>
  )
}

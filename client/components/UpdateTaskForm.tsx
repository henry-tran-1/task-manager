import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskWithId } from '../../models/tasks'
import {
  faAngleDown,
  faPenToSquare,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import useUpdateTaskById from '../hooks/useUpdateTaskById'
import { useState } from 'react'

interface Props {
  task: TaskWithId
  index: number
  deleteTask: (id: number) => void
  updateTask: (id: number) => void
  completeTask: (id: number, isCompleted: boolean) => void
}

export default function UpdateTaskForm({
  task,
  index,
  deleteTask,
  updateTask,
  completeTask,
}: Props) {
  // mutation hook to edit task
  const editTask = useUpdateTaskById()

  // state to handle form input
  const [formState, setFormState] = useState(task)

  // handles form submit
  const handleSubmit = () => {}
  // handles form changes
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    if (name === 'priority') {
      const valueNum = Number(value)
      setFormState((prev) => ({
        ...prev,
        [name]: valueNum,
        updatedAt: Date.now(),
      }))
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
        updatedAt: Date.now(),
      }))
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className={`flex flex-row justify-between `}>
          <div className="flex flex-row gap-2 ml-2">
            <button className="w-5 h-5">
              <FontAwesomeIcon
                icon={faAngleDown}
                className="text-lg opacity-50"
              />
            </button>
            <button onClick={() => completeTask(task.id, task.isCompleted)}>
              {task.isCompleted ? (
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  className="text-lg lg:text-2xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSquare}
                  className="text-lg lg:text-2xl"
                />
              )}
            </button>
            <div className="lg:w-[650px] w-[250px]">
              <input
                onChange={handleChange}
                name="title"
                id="title"
                type="text"
                value={formState.title}
                className={`${index % 2 ? 'bg-tabGray' : 'bg-white'} w-full  px-1 `}
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 mr-2">
            <button onClick={() => updateTask(task.id)}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-lg lg:text-2xl"
              />
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-lg lg:text-2xl"
              />
            </button>
          </div>
        </div>
        <div>
          <input
            onChange={handleChange}
            name="details"
            id="details"
            value={formState.details}
            className={`${index % 2 ? 'bg-tabGray' : 'bg-white'} ml-[60px] lg:ml-16 opacity-50  lg:w-[650px] w-[250px] px-1 `}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 ml-[65px] my-1">
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
          <button
            type="submit"
            className="px-1 bg-black rounded-md text-tabGray translate-y-[-15px]"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  )
}

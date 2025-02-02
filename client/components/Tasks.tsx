import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetAllTasks from '../hooks/useGetAllTasks'
import {
  faAngleDown,
  faAngleRight,
  faPenToSquare,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'
import { all } from 'superagent/lib/request-base'
import { TaskWithId } from '../../models/tasks'

interface Props {
  displayWindowState: boolean
}

export default function Tasks({ displayWindowState }: Props) {
  // state to manage details display
  const [displayDetails, setDisplayDetails] = useState<{
    [key: number]: boolean
  }>({})
  // state to manage priority tabs
  const [displayPriority, setDisplayPriority] = useState(0)

  // retrieve all tasks
  const { data, isPending, isError } = useGetAllTasks()

  // initialise displayDetails state when tasks are retrieved
  useEffect(() => {
    if (data) {
      const initDetailsState: { [key: number]: boolean } = {}
      data.forEach((item) => {
        initDetailsState[item.id] = false
      })
      setDisplayDetails(initDetailsState)
    }
  }, [data])

  // handles onClick for displayDetails
  const toggleDisplayDetails = (taskId: number) => {
    setDisplayDetails((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  // handles onClick for displayPriority
  const toggleDisplayPriority = (priority: number) => {
    setDisplayPriority(() => priority)
  }

  // filters tasks based on priority
  let filteredTasks: TaskWithId[] = []
  if (data) {
    if (displayPriority === 0) {
      filteredTasks = data
    } else {
      filteredTasks = data.filter((tasks) => tasks.priority === displayPriority)
    }
  }

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Sorry, an error has occurred</p>

  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} w-full h-full bg-backgroundWhite pt-2`}
    >
      <div className="flex h-12">
        <div className="inline-flex items-end">
          <button
            className={`${displayPriority === 0 ? 'bg-white h-12' : 'bg-tabGray h-10 border-b'} px-6 border-t border-r border-borderGray`}
            onClick={() => toggleDisplayPriority(0)}
          >
            All
          </button>
          <button
            className={`${displayPriority === 3 ? 'bg-white h-12' : 'bg-tabGray h-10 border-b'} border-t border-x px-6 border-borderGray mx-[-1px]`}
            onClick={() => toggleDisplayPriority(3)}
          >
            High
          </button>
          <button
            className={`${displayPriority === 2 ? 'bg-white h-12' : 'bg-tabGray h-10 border-b'} border-t border-x px-6  bg-tabGray border-borderGray mr-[-1px]`}
            onClick={() => toggleDisplayPriority(2)}
          >
            Med
          </button>
          <button
            className={`${displayPriority === 1 ? 'bg-white h-12' : 'bg-tabGray h-10 border-b'} border-t border-x px-6  bg-tabGray border-borderGray`}
            onClick={() => toggleDisplayPriority(1)}
          >
            Low
          </button>
        </div>
        <div className="w-full bg-white border-b border-borderGray"></div>
      </div>
      <div className="mt-2">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            className={`${index % 2 ? 'bg-tabGray' : 'bg-white'}`}
          >
            <div className={`flex flex-row justify-between `}>
              <div className="flex flex-row gap-2 ml-2">
                <button
                  onClick={() => toggleDisplayDetails(task.id)}
                  className="w-5 h-5"
                >
                  {displayDetails[task.id] ? (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-lg opacity-50"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="text-lg opacity-50"
                    />
                  )}
                </button>
                <button>
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
                <h2 className={`${task.isCompleted && 'line-through'}`}>
                  {task.title}
                </h2>
              </div>

              <div className="flex flex-row gap-2 mr-2">
                <button>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-lg lg:text-2xl"
                  />
                </button>
                <button>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-lg lg:text-2xl"
                  />
                </button>
              </div>
            </div>
            {displayDetails[task.id] && (
              <h2 className="ml-[60px] lg:ml-16 opacity-50">{task.details}</h2>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

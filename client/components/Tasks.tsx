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

interface Props {
  displayWindowState: boolean
}

export default function Tasks({ displayWindowState }: Props) {
  // state to manage details display
  const [displayDetails, setDisplayDetails] = useState<{
    [key: number]: boolean
  }>({})
  // state to manage priority tabs
  const [displayTasks, setDisplayTasks] = useState('all')

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

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Sorry, an error has occurred</p>

  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} w-full h-full bg-backgroundWhite pt-2`}
    >
      <div className="flex h-12">
        <div className="inline-flex items-end">
          <button className="h-12 px-6 bg-white border-t border-r border-borderGray">
            All
          </button>
          <button className="h-10 px-6 border bg-tabGray border-borderGray mx-[-1px]">
            High
          </button>
          <button className="h-10 px-6 border bg-tabGray border-borderGray mx-[-1px]">
            Med
          </button>
          <button className="h-10 px-6 border bg-tabGray border-borderGray">
            Low
          </button>
        </div>
        <div className="w-full bg-white border-b border-borderGray"></div>
      </div>
      <div className="mt-2">
        {data?.map((task, index) => (
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

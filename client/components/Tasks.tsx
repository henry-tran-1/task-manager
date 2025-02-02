import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetAllTasks from '../hooks/useGetAllTasks'
import {
  faAngleRight,
  faPenToSquare,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

interface Props {
  displayWindowState: boolean
}

export default function Tasks({ displayWindowState }: Props) {
  // retrieve all tasks
  const { data, isPending, isError } = useGetAllTasks()
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Sorry, an error has occurred</p>

  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} w-full h-full bg-backgroundWhite`}
    >
      <p className="h-12">Priority Tabs Will Be Here</p>
      <div>
        {data?.map((task, index) => (
          <div
            key={task.id}
            className={`flex flex-row justify-between ${index % 2 ? 'bg-tabGray' : 'bg-white'}`}
          >
            <div className="flex flex-row gap-2 ">
              <button>
                <FontAwesomeIcon icon={faAngleRight} className="opacity-50" />
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
              <h2>{task.title}</h2>
            </div>

            <div className="flex flex-row gap-2">
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
        ))}
      </div>
    </section>
  )
}

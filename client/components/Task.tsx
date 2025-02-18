import { faSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleDown,
  faAngleRight,
  faPenToSquare,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskWithId } from '../../models/tasks'

interface Props {
  task: TaskWithId

  displayDetails: { [key: number]: boolean }
  deleteTask: (id: number) => void
  updateTask: (id: number) => void
  completeTask: (id: number, isCompleted: boolean) => void
  toggleDisplayDetails: (id: number) => void
}

export default function Task({
  task,
  displayDetails,
  deleteTask,
  updateTask,
  completeTask,
  toggleDisplayDetails,
}: Props) {
  return (
    <section>
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
          <h2 className={`${task.isCompleted && 'line-through'} px-1`}>
            {task.title}
          </h2>
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
        {displayDetails[task.id] && (
          <h2 className="ml-[60px] lg:ml-[69px] opacity-50">{task.details}</h2>
        )}
      </div>
    </section>
  )
}

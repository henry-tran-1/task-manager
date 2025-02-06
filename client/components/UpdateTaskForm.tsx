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

interface Props {
  task: TaskWithId
  deleteTask: (id: number) => void
  updateTask: (id: number) => void
  completeTask: (id: number, isCompleted: boolean) => void
}

export default function UpdateTaskForm({
  task,
  deleteTask,
  updateTask,
  completeTask,
}: Props) {
  // mutation hook to edit task
  const editTask = useUpdateTaskById()

  // handles form submit
  // handles form changes

  return (
    <section>
      <form>
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
            <h2 className={`${task.isCompleted && 'line-through'}`}>
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
          <h2 className="ml-[60px] lg:ml-16 opacity-50">{task.details}</h2>
        </div>
        <div className="flex justify-between">
          <div>
            <p>Bunch of priority buttons</p>
          </div>
          <button>Update Task</button>
        </div>
      </form>
    </section>
  )
}

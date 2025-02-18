import useGetAllTasks from '../hooks/useGetAllTasks'
import { useEffect, useState } from 'react'
import { CompleteTask, TaskWithId } from '../../models/tasks'
import useDeleteTaskById from '../hooks/useDeleteTaskById'
import useCompleteTaskById from '../hooks/useCompleteTaskById'
import UpdateTaskForm from './UpdateTaskForm'
import Task from './Task'

interface Props {
  displayWindowState: boolean
}

export default function Tasks({ displayWindowState }: Props) {
  // state to manage details display
  const [displayDetails, setDisplayDetails] = useState<{
    [key: number]: boolean
  }>({})
  // state to manage edit tasks
  const [updateTask, setUpdateTask] = useState<{ [key: number]: boolean }>({})
  // state to manage priority tabs
  const [displayPriority, setDisplayPriority] = useState(0)

  // hook to retrieve data
  const { data, isPending, isError } = useGetAllTasks()
  // mutation hooks for tasks
  const deleteTask = useDeleteTaskById()
  const completeTask = useCompleteTaskById()

  // initialise displayDetails and editTask state when tasks are retrieved
  useEffect(() => {
    if (data) {
      const initDetailsState: { [key: number]: boolean } = {}
      const initEditTask: { [key: number]: boolean } = {}
      data.forEach((item) => {
        initDetailsState[item.id] = false
        initEditTask[item.id] = false
      })
      setDisplayDetails(initDetailsState)
      setUpdateTask(initEditTask)
    }
  }, [data])

  // handles onClick for displayDetails
  const toggleDisplayDetails = (taskId: number) => {
    setDisplayDetails((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  // handles onClick for edit task
  const toggleUpdateTask = (taskId: number) => {
    setUpdateTask((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
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

  // handles onClick for delete task
  const handleDeleteTask = (id: number) => {
    deleteTask.mutate(id)
  }

  // handles onClick for complete task
  const handleCompleteTask = (id: number, isCompleted: boolean) => {
    completeTask.mutate({ id, isCompleted: !isCompleted } as CompleteTask)
  }

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Sorry, an error has occurred</p>

  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} w-full h-full bg-backgroundWhite pt-2 overflow-y-auto`}
    >
      <div className="flex h-12">
        <div className="inline-flex items-end">
          <button
            className={`${displayPriority === 0 ? 'bg-white h-12' : 'bg-tabGray h-10 border-b'} transition-all duration-100 px-6 border-t border-r border-borderGray`}
            onClick={() => toggleDisplayPriority(0)}
          >
            All
          </button>
          <button
            className={`${displayPriority === 3 ? 'bg-white h-12' : 'bg-[#D6A5A5] h-10 border-b'} transition-all duration-100 border-t border-x px-6 border-borderGray mx-[-1px]`}
            onClick={() => toggleDisplayPriority(3)}
          >
            High
          </button>
          <button
            className={`${displayPriority === 2 ? 'bg-white h-12' : 'bg-[#E3D5A0] h-10 border-b'} transition-all duration-100 border-t border-x px-6  border-borderGray mr-[-1px]`}
            onClick={() => toggleDisplayPriority(2)}
          >
            Med
          </button>
          <button
            className={`${displayPriority === 1 ? 'bg-white h-12' : 'bg-[#A8C3A2] h-10 border-b'} transition-all duration-100 border-t border-x px-6  border-borderGray`}
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
            {updateTask[task.id] ? (
              <UpdateTaskForm
                task={task}
                index={index}
                deleteTask={handleDeleteTask}
                updateTask={toggleUpdateTask}
                completeTask={handleCompleteTask}
              />
            ) : (
              <div>
                <Task
                  task={task}
                  displayDetails={displayDetails}
                  deleteTask={handleDeleteTask}
                  updateTask={toggleUpdateTask}
                  completeTask={handleCompleteTask}
                  toggleDisplayDetails={toggleDisplayDetails}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

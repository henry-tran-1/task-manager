import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { TaskWithId, UpdateTask } from '../../models/tasks'

// update task by id
export default function useUpdateTaskById() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: UpdateTask) => API.updateTaskById(task),

    onMutate: async (updatedTask) => {
      // cancels in-flight queries
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      // caches current tasks array
      const previousTasks =
        queryClient.getQueryData<TaskWithId[]>(['tasks']) || []

      // captures the current task to be updated
      const taskToBeUpdated = previousTasks.find(
        (task) => task.id === updatedTask.id
      )
      if (!taskToBeUpdated) {
        return { previousTasks }
      }

      // updates this current task with the updated data
      const optimisticTask = { ...taskToBeUpdated, ...updatedTask }

      // adds the current cache, minus the task to be updated, to the updated task
      // then set it as ['tasks']
      const newTasks = <TaskWithId[]>[
        optimisticTask,
        ...previousTasks.filter((task) => task.id !== updatedTask.id),
      ]
      queryClient.setQueryData<TaskWithId[]>(['tasks'], newTasks)

      return { previousTasks }
    },

    onError: (_err, _updatedTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

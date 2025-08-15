import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { Task, TaskWithId } from '../../models/tasks'

// add new task
export default function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => API.createTask(task),

    onMutate: async (newTask) => {
      // cancels in-flight queries, which could affect the optimistic update
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      // caches current tasks array
      const previousTasks =
        queryClient.getQueryData<TaskWithId[]>(['tasks']) || []

      // creates the new task to be added with a placeholder id
      const optimisticTask = {
        id: Date.now(),
        ...newTask,
      }

      // adds the current cache to the newly created task
      // then set it as ['tasks']
      const newTasks = [optimisticTask, ...previousTasks]
      queryClient.setQueryData<TaskWithId[]>(['tasks'], newTasks)

      // this return is for use in the context below
      return { previousTasks }
    },

    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

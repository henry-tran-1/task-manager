import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { Task, TaskWithId } from '../../models/tasks'

// add new task
export default function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => API.createTask(task),

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTasks = queryClient.getQueryData(['tasks']) as TaskWithId

      const optimisticTask = {
        id: Date.now(),
        ...newTask,
      }
      queryClient.setQueryData<TaskWithId[]>(['tasks'], (old = []) => [
        optimisticTask,
        ...old,
      ])

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

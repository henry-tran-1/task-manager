import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { TaskWithId } from '../../models/tasks'

// delete task by id
export default function useDeleteTaskById() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => API.deleteTaskById(id),

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTasks =
        queryClient.getQueryData<TaskWithId[]>(['tasks']) || []

      const newTasks = previousTasks.filter((task) => task.id !== taskId)
      queryClient.setQueryData(['tasks'], newTasks)

      return { previousTasks }
    },
    onError: (_err, _taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

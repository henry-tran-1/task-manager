import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { CompleteTask, TaskWithId } from '../../models/tasks'

// complete task by id
// uses optimistic updating, otherwise site feels sluggish
export default function useCompleteTaskById() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskStatus: CompleteTask) => API.completeTaskById(taskStatus),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTasks =
        queryClient.getQueryData<TaskWithId[]>(['tasks']) || []

      const newTasks = previousTasks.map((task) =>
        task.id === newTask.id
          ? { ...task, isCompleted: newTask.isCompleted }
          : task
      )
      queryClient.setQueryData(['tasks'], newTasks)

      return { previousTasks }
    },
    onError: (_err, _newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

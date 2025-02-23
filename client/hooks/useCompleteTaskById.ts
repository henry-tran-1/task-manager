import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { CompleteTask, TaskWithId } from '../../models/tasks'

// complete task by id
export default function useCompleteTaskById() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskStatus: CompleteTask) => API.completeTaskById(taskStatus),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTasks = queryClient.getQueryData(['tasks']) as TaskWithId

      queryClient.setQueryData(['tasks'], (old: TaskWithId[] | undefined) =>
        old?.map((task) =>
          task.id === newTask.id
            ? { ...task, isCompleted: newTask.isCompleted }
            : task
        )
      )
      return { previousTasks }
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

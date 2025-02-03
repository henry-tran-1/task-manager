import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { Task } from '../../models/tasks'

// add new task
export default function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => API.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

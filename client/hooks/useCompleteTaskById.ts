import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { CompleteTask } from '../../models/tasks'

// complete task by id
export default function useCompleteTaskById() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskStatus: CompleteTask) => API.completeTaskById(taskStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

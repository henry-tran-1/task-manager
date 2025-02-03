import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'
import { UpdateTask } from '../../models/tasks'

// update task by id
export default function useUpdateTaskById() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: UpdateTask) => API.updateTaskById(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

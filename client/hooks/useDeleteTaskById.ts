import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/aliClient'

// delete task by id
export default function useDeleteTaskById() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => API.deleteTaskById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

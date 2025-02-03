import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/aliClient'

// retrieve task by id
export default function useGetTaskById(id: number) {
  return useQuery({
    queryKey: ['task'],
    queryFn: () => API.getTaskById(id),
  })
}

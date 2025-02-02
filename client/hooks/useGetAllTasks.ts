import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/aliClient'

// retrieve all tasks
export default function useGetAllTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => API.getAllTasks(),
  })
}

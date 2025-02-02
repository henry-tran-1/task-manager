import useGetAllTasks from '../hooks/useAllTasks'

interface Props {
  displayWindowState: boolean
}

export default function Tasks({ displayWindowState }: Props) {
  // retrieve all tasks
  const { data, isPending, isError } = useGetAllTasks()
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Sorry, an error has occurred</p>

  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} w-full h-full bg-backgroundWhite`}
    >
      <p>this will be the list of tasks component</p>

      <div>{data?.map((task) => <div key={task.id}>{task.title}</div>)}</div>
    </section>
  )
}

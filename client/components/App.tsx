import AddTask from './AddTask.tsx'
import Tasks from './Tasks.tsx'
import TitleBar from './TitleBar.tsx'

export default function App() {
  return (
    <>
      <div className="app">
        <TitleBar />
        <AddTask />
        <Tasks />
      </div>
    </>
  )
}

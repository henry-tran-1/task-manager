import AddTask from './AddTask.tsx'
import Tasks from './Tasks.tsx'
import TitleBar from './TitleBar.tsx'

export default function App() {
  return (
    <main className="w-screen h-screen bg-red-600 lg:w-[800px] lg:h-[600px]">
      <div className="app">
        <TitleBar />
        <AddTask />
        <Tasks />
      </div>
    </main>
  )
}

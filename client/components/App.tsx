import { useState } from 'react'
import AddTask from './AddTask.tsx'
import Tasks from './Tasks.tsx'
import TitleBar from './TitleBar.tsx'

export default function App() {
  const [maxWindow, setMaxWindow] = useState(false)

  return (
    <main className="w-screen h-screen lg:w-[800px] lg:h-[600px]">
      <div className="flex flex-col w-full h-full">
        <TitleBar />
        <AddTask />
        <Tasks />
      </div>
    </main>
  )
}

import { useState } from 'react'
import AddTask from './AddTask.tsx'
import Tasks from './Tasks.tsx'
import TitleBar from './TitleBar.tsx'

export default function App() {
  // state to toggle fullscreen
  const [maxWindow, setMaxWindow] = useState(false)
  // state to toggle open/close window
  const [displayWindow, setDisplayWindow] = useState(true)

  // handler to toggle fullscreen
  const toggleMaxWindow = () => {
    setMaxWindow((prev) => !prev)
  }
  // handler to toggle open/close window
  const toggleDisplayWindow = () => {
    setDisplayWindow((prev) => !prev)
  }

  return (
    <main
      className={`w-screen h-screen ${maxWindow ? 'lg:w-screen lg:h-screen' : 'lg:w-[800px] lg:h-[600px]'} `}
    >
      <div className="flex flex-col w-full h-full">
        <TitleBar
          onClickMaxWindow={toggleMaxWindow}
          onClickDisplayWindow={toggleDisplayWindow}
          maxWindowState={maxWindow}
        />
        <AddTask displayWindowState={displayWindow} />
        <Tasks displayWindowState={displayWindow} />
      </div>
    </main>
  )
}

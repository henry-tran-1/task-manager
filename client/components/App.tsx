/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import AddTask from './AddTask.tsx'
import Tasks from './Tasks.tsx'
import TitleBar from './TitleBar.tsx'

export default function App() {
  // state to toggle fullscreen
  const [maxWindow, setMaxWindow] = useState(false)
  // state to toggle open/close window
  const [displayWindow, setDisplayWindow] = useState(true)
  // state to handle the display of the full add-task form
  const [displayForm, setDisplayForm] = useState(false)

  // handler to toggle fullscreen
  const toggleMaxWindow = () => {
    setMaxWindow((prev) => !prev)
  }
  // handler to toggle open/close window
  const toggleDisplayWindow = () => {
    setDisplayWindow((prev) => !prev)
  }
  // handler to toggle off the full form display
  const toggleDisplayForm = (display: boolean) => {
    setDisplayForm(() => display)
  }

  return (
    <main
      onClick={() => toggleDisplayForm(false)}
      className="flex items-center justify-center w-screen h-screen bg-backgroundBlue font-body"
    >
      <div
        className={`w-screen h-screen ${maxWindow ? 'lg:w-screen lg:h-screen' : 'lg:w-[800px] lg:max-h-[600px]'} `}
      >
        <div className="flex flex-col w-full h-full">
          <TitleBar
            onClickMaxWindow={toggleMaxWindow}
            onClickDisplayWindow={toggleDisplayWindow}
            maxWindowState={maxWindow}
          />
          <AddTask
            displayWindowState={displayWindow}
            displayFormState={displayForm}
            onClickDisplayForm={toggleDisplayForm}
          />
          <Tasks displayWindowState={displayWindow} />
        </div>
      </div>
    </main>
  )
}

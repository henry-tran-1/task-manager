/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useState } from 'react'
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
  // state to track when app is draggable
  const [isDragging, setIsDragging] = useState(false)
  // state to track app position
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // state to track initial mouse position
  const [startMouse, setStartMouse] = useState({ x: 0, y: 0 })

  // handler to toggle fullscreen
  const toggleMaxWindow = () => {
    setMaxWindow((prev) => !prev)
    if (!maxWindow) {
      setPosition({ x: 0, y: 0 })
    }
  }
  // handler to toggle open/close window
  const toggleDisplayWindow = () => {
    setDisplayWindow((prev) => !prev)
  }
  // handler to toggle off the full form display
  const toggleDisplayForm = (display: boolean) => {
    setDisplayForm(() => display)
  }

  // handler for when mouse is clicked to begin dragging
  const handleMouseDown = (event: React.MouseEvent) => {
    if (maxWindow) return

    event.preventDefault()

    setIsDragging(() => true)
    setStartMouse(() => ({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    }))
  }

  // handler for when mouse is moved to drag app around
  const handleMouseMove = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (!isDragging) return
      setPosition(() => ({
        x: event.clientX - startMouse.x,
        y: event.clientY - startMouse.y,
      }))
    },
    [isDragging, startMouse.x, startMouse.y],
  )

  // handler for when mouse is released to stop dragging
  const handleMouseUp = () => {
    setIsDragging(() => false)
  }

  // handles when mouse is clicked to drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, isDragging])

  return (
    <main
      onClick={() => toggleDisplayForm(false)}
      className="fixed w-screen h-screen bg-backgroundBlue font-body"
    >
      <div
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        className={`w-screen h-screen ${maxWindow ? 'lg:w-screen lg:h-screen' : 'lg:w-[800px] lg:h-[600px]'} absolute `}
      >
        <div className="flex flex-col w-full h-full">
          <TitleBar
            onClickMaxWindow={toggleMaxWindow}
            onClickDisplayWindow={toggleDisplayWindow}
            maxWindowState={maxWindow}
            onMouseDown={handleMouseDown}
            isDragging={isDragging}
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

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useState } from 'react'
import AddTask from './AddTask.tsx'
import Tasks from './Tasks.tsx'
import TitleBar from './TitleBar.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright, faXmark, faInfo } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faWindows } from '@fortawesome/free-brands-svg-icons'
export default function App() {
  // state to track if large screen (vs mobile screen)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  // state to toggle fullscreen
  const [maxWindow, setMaxWindow] = useState(false)
  // state to toggle open/close window
  const [displayWindow, setDisplayWindow] = useState(true)
  // state to handle diplay of full form
  const [displayForm, setDisplayForm] = useState(false)
  // state to track when app is draggable
  const [isDragging, setIsDragging] = useState(false)
  // state to handle when app is resizing
  const [isResizing, setIsResizing] = useState(false)
  // state to track app position
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // state to track initial mouse position
  const [startMouse, setStartMouse] = useState({ x: 0, y: 0 })
  // state to handle size of app window
  const [size, setSize] = useState({ width: 700, height: 600 })
  // state to track initial window size
  const [initialSize, setInitialSize] = useState({ width: 700, height: 600 })
  // state to track initial mouse position for resizing
  const [startMouseResize, setStartMouseResize] = useState({ x: 0, y: 0 })
  // state to show/hide instructions
  const [displayInstructions, setDisplayInstructions] = useState(true)
  //   state to set windows background
  const [windowsBG, setWindowsBG] = useState(false)

  // tracks screen size and updates isLargeScreen
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(() => window.innerWidth >= 1024)
    }

    // if large screen, place the  app in the middle
    if (window.innerWidth >= 1024) {
      setPosition({
        x: window.innerWidth / 2 - 350,
        y: window.innerHeight / 2 - 300,
      })
      // if mobile screen, place the app at the top left
    } else {
      setPosition({
        x: 0,
        y: 0,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  // handler to toggle fullscreen
  const toggleMaxWindow = () => {
    setMaxWindow((prev) => !prev)
    if (!maxWindow) {
      setPosition({ x: 0, y: 0 })
    } else {
      setPosition({
        x: window.innerWidth / 2 - 350,
        y: window.innerHeight / 2 - 300,
      })
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

      const newX = event.clientX - startMouse.x
      const newY = event.clientY - startMouse.y
      // stops window from being dragged to an unclickable area
      setPosition(() => ({
        x: Math.max(-300, Math.min(window.innerWidth - 100, newX)),
        y: Math.max(0, Math.min(window.innerHeight - 100, newY)),
      }))
    },
    [isDragging, startMouse.x, startMouse.y]
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

  // handler for when mouse is clicked to begin resizing
  const handleMouseDownResize = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsResizing(() => true)
    setStartMouseResize(() => ({
      x: event.clientX,
      y: event.clientY,
    }))
    setInitialSize(() => ({
      width: size.width,
      height: size.height,
    }))
  }
  // handler for when mouse is moved to resize app
  const handleMouseMoveResize = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (!isResizing) return

      const dx = event.clientX - startMouseResize.x
      const dy = event.clientY - startMouseResize.y

      // sets minimum width and height to window
      let newWidth
      let newHeight
      if (initialSize.width + dx <= 400) newWidth = 400
      else newWidth = initialSize.width + dx
      if (initialSize.height + dy <= 350) newHeight = 350
      else newHeight = initialSize.height + dy

      setSize(() => ({
        width: newWidth,
        height: newHeight,
      }))
    },
    [
      isResizing,
      startMouseResize.x,
      startMouseResize.y,
      initialSize.width,
      initialSize.height,
    ]
  )

  // handler for when mouse is released to stop resizing
  const handleMouseUpResize = () => {
    setIsResizing(() => false)
  }

  // handles when mouse is clicked to resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMoveResize)
      document.addEventListener('mouseup', handleMouseUpResize)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveResize)
      document.removeEventListener('mouseup', handleMouseUpResize)
    }
  }, [isResizing, handleMouseMoveResize])

  return (
    <main
      onClick={() => toggleDisplayForm(false)}
      className={`w-screen h-screen bg-backgroundBlue  ${
        windowsBG && 'bg-[url(/images/windows_background.jpg)]'
      }`}
    >
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isLargeScreen && !maxWindow ? size.width : undefined,
          height: isLargeScreen && !maxWindow ? size.height : undefined,
        }}
        className={`w-screen h-screen ${
          maxWindow ? 'lg:w-screen lg:h-screen' : 'lg:w-[800px] lg:h-[600px]'
        } absolute z-10`}
      >
        <div className="flex flex-col w-full h-full">
          <TitleBar
            onClickMaxWindow={toggleMaxWindow}
            onClickDisplayWindow={toggleDisplayWindow}
            maxWindowState={maxWindow}
            onMouseDown={handleMouseDown}
            isDragging={isDragging}
            isDisplayWindow={displayWindow}
          />
          <AddTask
            displayWindowState={displayWindow}
            displayFormState={displayForm}
            onClickDisplayForm={toggleDisplayForm}
          />
          <Tasks displayWindowState={displayWindow} />
        </div>
        {!maxWindow && (
          <div
            onMouseDown={handleMouseDownResize}
            className="absolute w-5 h-5 bg-transparent -bottom-1.5 -right-1.5 cursor-se-resize"
          ></div>
        )}
      </div>
      {isLargeScreen && !maxWindow && (
        <div className="absolute z-0 right-3 ">
          <button
            onClick={() => setWindowsBG(!windowsBG)}
            className="flex items-center justify-center p-2"
          >
            <FontAwesomeIcon
              icon={faWindows}
              className="text-3xl pointer-events-none"
            />
          </button>
        </div>
      )}

      <div
        className={`absolute z-0 items-center justify-center left-1/2 -translate-x-1/2 top-4 gap-2 flex`}
      >
        <p
          className={`text-gray-500 ${
            isLargeScreen && displayInstructions ? 'visible' : 'invisible'
          }`}
        >
          Feel free to move the window around, minimise/maximise, or resize the
          window from the bottom-right
        </p>
        {isLargeScreen &&
          (displayInstructions ? (
            <button
              onClick={() => setDisplayInstructions(false)}
              className="relative z-0 "
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-gray-500 hover:text-black"
              />
            </button>
          ) : (
            <button
              onClick={() => setDisplayInstructions(true)}
              className="relative z-0"
            >
              <FontAwesomeIcon
                icon={faInfo}
                className="text-gray-500 hover:text-black"
              />
            </button>
          ))}
      </div>
      <div className="absolute z-0 w-full bottom-1">
        {/* <section className="flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faCopyright} />
          <p>2025 Henry Tran</p>
        </section> */}
        <section className="flex items-center justify-center gap-2">
          <p>
            Check out the{' '}
            <a
              href="https://github.com/henry-tran-1/task-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <FontAwesomeIcon icon={faGithub} /> repo here
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}

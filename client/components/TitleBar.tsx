import {
  faExpand,
  faListCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TitleBar() {
  return (
    <header className="bg-titleBlue h-[32px] lg:h-[40px] flex justify-between">
      <section className="flex items-center justify-start gap-1">
        <FontAwesomeIcon
          icon={faListCheck}
          className="mx-2 text-lg lg:text-2xl"
        />
        <p className="text-base lg:text-lg">Task Manager</p>
      </section>
      <section className="flex items-center justify-end gap-1">
        <button>
          <FontAwesomeIcon
            icon={faExpand}
            className="hidden text-lg lg:flex lg:text-2xl"
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faXmark}
            className="mx-2 text-lg lg:text-2xl"
          />
        </button>
      </section>
    </header>
  )
}

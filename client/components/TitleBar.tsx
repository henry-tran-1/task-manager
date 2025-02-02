import {
  faCompress,
  faExpand,
  faListCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClickMaxWindow: () => void
  onClickDisplayWindow: () => void
  maxWindowState: boolean
}

export default function TitleBar({
  onClickMaxWindow,
  onClickDisplayWindow,
  maxWindowState,
}: Props) {
  return (
    <header className="bg-titleBlue h-[32px] lg:h-[40px] flex justify-between border-b border-borderGray">
      {/* left section of title bar */}
      <section className="flex items-center justify-start gap-1">
        <FontAwesomeIcon
          icon={faListCheck}
          className="mx-2 text-lg lg:text-2xl"
        />
        <p className="text-base lg:text-lg">Task Manager</p>
      </section>

      {/* right section of title bar */}
      <section className="flex items-center justify-end gap-1">
        <button onClick={onClickMaxWindow}>
          {maxWindowState ? (
            <FontAwesomeIcon
              icon={faCompress}
              className="hidden text-lg lg:flex lg:text-2xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faExpand}
              className="hidden text-lg lg:flex lg:text-2xl"
            />
          )}
        </button>
        <button onClick={onClickDisplayWindow}>
          <FontAwesomeIcon
            icon={faXmark}
            className="mx-2 text-lg lg:text-2xl"
          />
        </button>
      </section>
    </header>
  )
}

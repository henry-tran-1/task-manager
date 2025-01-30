interface Props {
  displayWindowState: boolean
}

export default function Tasks({ displayWindowState }: Props) {
  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} w-full h-full bg-backgroundWhite`}
    >
      <p>this will be the list of tasks component</p>
    </section>
  )
}

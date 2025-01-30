interface Props {
  displayWindowState: boolean
}

export default function AddTask({ displayWindowState }: Props) {
  return (
    <section
      className={`${displayWindowState ? 'block' : 'invisible'} bg-barGray h-[64px] lg:h-[80px]`}
    >
      <p>this will be the addtask bar</p>
    </section>
  )
}

type Props = {
  date: string
}

export default function Date({ date }: Props) {
  return (
    <em className="not-italic font-mono text-neutral-600 dark:text-neutral-500">
      {date}
    </em>
  )
}

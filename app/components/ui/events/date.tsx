type Props = {
  date: string
}

const Date = ({ date }: Props) => (
  <em className="not-italic font-mono text-neutral-600 dark:text-neutral-500">
    {date}
  </em>
)

export default Date

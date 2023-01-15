import Date from '~/components/ui/events/date'

type Props = {
  title: string
  school: string
  location: string
  postscript?: string
  dates: string
}

export default function Education({
  title,
  school,
  location,
  dates,
  postscript,
}: Props) {
  return (
    <div>
      <strong className="font-medium">{title}</strong>
      <br />
      {postscript && (
        <>
          First Class Honours
          <br />
        </>
      )}
      {school}, {location}
      <br />
      <Date date={dates} />
    </div>
  )
}

import Link from '~/components/ui/link'
import Date from '~/components/ui/events/date'

type Props = {
  date?: string
  title: string
  link?: {
    title: string
    href: string
  }
  stack?: boolean
}

export default function Item({ date, title, link, stack }: Props) {
  const classes = stack ? 'flex flex-col' : 'flex'
  return (
    <li className={`${classes} gap-2`}>
      {date && !stack && <Date date={date} />}
      <div>
        {title}
        {link && (
          <>
            , <Link href={link.href}>{link.title}</Link>
          </>
        )}
        {date && stack && (
          <>
            <br />
            <Date date={date} />
          </>
        )}
      </div>
    </li>
  )
}

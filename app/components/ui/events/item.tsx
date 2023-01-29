import Link from '~/components/ui/link'
import DateComponent from '~/components/ui/events/date'

type Props = {
  date?: string
  title: string
  link?: {
    title: string
    href: string
  }
  added?: string
}

function Item({ date, title, link, added }: Props) {
  if (added && (!parseInt(added) || new Date(added).getTime() <= 0)) {
    console.warn('Incorrect date provided—use Date.now()')
    return null
  }

  const highlight = added
    ? Math.round((Date.now() - parseInt(added)) / (1000 * 60 * 60 * 24)) <= 28
    : null

  return (
    <li className="flex gap-2">
      {date && <DateComponent date={date} />}
      <div>
        {highlight && (
          <span className="relative -ml-1 -top-[1px] border border-yellow-600 text-yellow-600 dark:border-yellow-700 dark:text-yellow-500 rounded-md px-1 py-0.25 mr-1 leading-none font-display text-xxs">
            New
          </span>
        )}
        {title}
        {link && (
          <>
            , <Link href={link.href}>{link.title}</Link>
          </>
        )}
      </div>
    </li>
  )
}

export default Item

import Link from "~/components/ui/link"
import Date from "~/components/ui/events/date"

type Props = {
  date?: string
  title: string,
  link?: {
    title: string
    href: string,
  }
}

const Item = ({date, title, link}:Props) => (
  <li className="flex gap-2">
    {date && <Date date={date} />}
    <div>
      {title}
      {link && <>
        , <Link href={link.href}>{link.title}</Link>
      </>}
    </div>
  </li>
)

export default Item




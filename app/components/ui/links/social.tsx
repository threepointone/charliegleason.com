import type { FunctionComponent } from 'react'
import Link from '~/components/ui/link'

type Props = {
  title: string
  url: string
  icon: FunctionComponent
}

export default function Social({ icon, title, url }: Props) {
  return (
    <div key={url} className="w-1/2 sm:w-auto">
      <Link icon={icon} href={url} background={false} padding="large">
        {title}
      </Link>
    </div>
  )
}

import type { ReactNode } from 'react'
import Link from '~/components/ui/link'

type Props = {
  id: string
  name: string
  company: string
  role: string
  url: string
  hero?: boolean
  children: ReactNode
}

export default function Quote({
  id,
  name,
  role,
  company,
  url,
  hero = false,
  children,
}: Props) {
  return (
    <blockquote
      key={name}
      className={`flex flex-col justify-between ${
        hero ? 'sm:col-span-2' : 'col-span-1'
      }`}
    >
      <p
        className={`-indent-2 text-neutral-800 dark:text-neutral-300 ${
          hero ? 'text-lg' : 'text-sm'
        }`}
      >
        {children}
      </p>
      <cite className="not-italic uppercase tracking-wider mt-3 flex items-center">
        <img
          className="rounded-full mr-2 w-8 h-8 border-2 border-neutral-300 dark:border-neutral-700 bg-white"
          src={`/assets/avatars/avatar-${id}.jpg`}
          alt={`Black and white headshot of ${name}`}
          width="30"
          height="30"
        />
        <div>
          <div className="text-neutral-700 dark:text-neutral-400 font-semibold text-xs">
            {name}
          </div>
          <div className="text-neutral-600 dark:text-neutral-500 text-xxs">
            {role}, <Link href={url}>{company}</Link>
          </div>
        </div>
      </cite>
    </blockquote>
  )
}

import { Fragment } from 'react'
import Link from '~/components/ui/link'
import { EMOJI_URL } from '~/constants'

type Props = {
  sections: Entries[]
}

type Entries = {
  title: string
  data: Entry[]
  notes?: Note[]
}

type Entry = {
  icon: string
  property?: string
  title: string
  subtitle?: string
  url: string
}

type Note = {
  date: string
  slug: string
  title: string
  source: string
}

const Selected = ({ sections }: Props) => {
  return (
    <>
      {sections.map((section) => (
        <Fragment key={section.title}>
          <div className="sm:flex">
            <h3 className="font-display uppercase leading-none tracking-wider text-xs text-yellow-700 dark:text-yellow-500 pr-8 flex-none sm:[writing-mode:vertical-rl] whitespace-no-wrap mb-8 sm:mb-0">
              <span className="sticky" style={{ top: '3rem' }}>
                Selected {section.title}
              </span>
            </h3>

            <div className="space-y-8">
              <div className="space-y-8">
                {section.data.map((entry) => {
                  return (
                    <div key={entry.title} className="flex items-start">
                      <img
                        className="relative mr-4 rounded-full"
                        // TODO: Move to edge API
                        src={`${EMOJI_URL}${entry.icon}/selected`}
                        alt={`${entry.icon} emoji in a yellow circle`}
                        width="30"
                        height="30"
                      />
                      <div>
                        {entry.property && (
                          <div className="text-xs uppercase tracking-widest font-medium text-neutral-700 dark:text-neutral-400">
                            {entry.property}
                          </div>
                        )}
                        <Link href={entry.url} size="large">
                          {entry.title}
                        </Link>
                        {entry.subtitle && (
                          <div className="text-sm text-neutral-700 dark:text-neutral-400">
                            {entry.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {section.notes && (
                <div className="space-y-2 min-w-0 max-w-full">
                  {section.notes.map((note) => {
                    return (
                      <div
                        key={note.slug}
                        className="flex items-center space-x-6 ml-2"
                      >
                        <svg
                          className="inline-block flex-shrink-0 fill-current text-yellow-400"
                          viewBox="0 0 24 24"
                          height="12"
                          width="12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="8"></circle>
                        </svg>

                        <a
                          href={note.slug}
                          className="text-sm sm:text-sm truncate"
                        >
                          {note.title}
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  )
}

export default Selected

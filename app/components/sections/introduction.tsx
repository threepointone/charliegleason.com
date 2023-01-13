import Link from '~/components/ui/link'

const Introduction = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-xl">
          I’m a user interface / user experience lead at{' '}
          <Link href="https://salesforce.com">Salesforce</Link>.
        </h1>

        <p>
          Before that I looked after design and front-end development for the
          London-based crowdfunding publisher{' '}
          <Link href="http://unbound.com/">Unbound</Link> and the
          Melbourne-based social film site Goodfilms, and was the
          technical lead of the{' '}
          <Link href="https://www.clemengerbbdo.com.au">
            Clemenger BBDO
          </Link>{' '}
          ad&nbsp;agency.
        </p>
        <p>
          I studied design and computer science, and I like the space between
          art and code. I also enjoy the blind terror of the creative process,
          solving difficult problems, and a clean sheet of&nbsp;paper.
        </p>
        <p>I cannot skateboard. I tried, but it was a whole&nbsp;thing.</p>
      </div>

      <div
        aria-hidden="true"
        className="dark:text-neutral-700 text-neutral-300 select-none"
      >
        • • •
      </div>

      <div className="space-y-4 text-sm text-neutral-800 dark:text-neutral-400">
        <p>
          In my spare time I like to work on micro projects, from{' '}
          <Link href="https://sandpitjs.com/">tools for creative coding</Link>
          , to{' '}
          <Link href="http://tweetflight.wearebrightly.com/">
            tweet-based music videos
          </Link>
          , to{' '}
          <Link href="https://superhighfives.com/pika">
            design-focused macOS apps
          </Link>
          . I also like to{' '}
          <Link href="https://medium.com/superhighfives">
            write about development
          </Link>
          , contribute to{' '}
          <Link href="http://github.com/superhighfives/">open source</Link>,
          and share{' '}
          <Link href="https://dribbble.com/superhighfives">
            visual resources
          </Link>
          .
        </p>
        <p>
          My work has been featured by Google’s Creative Sandbox, and has
          received numerous awards, including from{' '}
          <Link href="https://thefwa.com/profiles/charlie-gleason">
            Awwwards
          </Link>{' '}
          and{' '}
          <Link href="https://thefwa.com/profiles/charlie-gleason">
            the&nbsp;FWA
          </Link>
          .
        </p>
        <p>
          I believe there are very few things that can’t be made easier with
          good documentation.
        </p>
      </div>
    </div>
  )
}

export default Introduction

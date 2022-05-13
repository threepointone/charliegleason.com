import Link from "~/components/ui/link"

const Footer = () => (
  <div className="text-xxs text-neutral-600 dark:text-neutral-400 max-w-lg pb-16 sm:pb-20 md:pb-36 pt-24 sm:pt-48 space-y-2">
    <p>
      Typeset in{' '}
      <Link type="text" href="https://dharmatype.com/commuters-sans">
        Commuter Sans
      </Link>{' '}
      and the{' '}
      <Link type="text" href="https://systemfontstack.com/">
        system font&nbsp;stack
      </Link>
      .
    </p>
    <p>
      Built with{' '}
      <Link type="text" href="https://nextjs.org/">
        NextJS
      </Link>
      . CSS with{' '}
      <Link type="text" href="https://tailwindcss.com/">
        Tailwind
      </Link>
      . Hosted on&nbsp;
      <Link type="text" href="https://www.heroku.com/">
        Heroku
      </Link>
      .
    </p>
    <p>
      Primary illustration inspired by{' '}
      <Link type="text" href="https://thedesignsquiggle.com/">
        The Design&nbsp;Squiggle
      </Link>
      .
    </p>
  </div>
)

export default Footer

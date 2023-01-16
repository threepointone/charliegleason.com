import Toggle from './toggle'
import Avatar from './avatar'

type Props = {
  symbol: string
  photo: string | false
  small?: boolean
}

export default function Header(props: Props) {
  return (
    <div
      className={`space-y-4 ${!props.small && 'pt-24 sm:pt-48'} ${
        props.small && '-mt-[3.5rem] sm:-mt-[5rem]'
      }`}
    >
      <div className="flex items-center">
        <Toggle />
        <Avatar {...props} />
      </div>
      <hgroup className="font-display uppercase tracking-wider text-xs">
        <a
          href="/"
          className="relative hover:opacity-80 active:opacity-80 transition-opacity block w-64 sm:w-80 z-10 -mt-6 sm:-mt-8 ml-0 sm:-ml-4 lg:-ml-12 mb-2 lg:mb-0 max-w-full"
        >
          <img
            alt=""
            src={`/assets/signatures/signature-dark.png`}
            width="700"
            height="260"
            className="block dark:hidden"
          />
          <img
            alt=""
            src={`/assets/signatures/signature-light.png`}
            width="700"
            height="260"
            className="hidden dark:block"
          />
        </a>
        <h1>Charlie Gleason</h1>
        <h2 className="bg-yellow-800 dark:bg-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 dark:from-yellow-500 to-transparent">
          Designer, developer, creative coder, and&nbsp;musician
        </h2>
      </hgroup>
    </div>
  )
}

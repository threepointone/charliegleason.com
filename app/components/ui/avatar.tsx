import { EMOJI_URL } from '~/constants'

type Props = {
  symbol: string
  photo: string | false
  small?: boolean
}

export default function Avatar({ symbol = '🙈', photo = false, small = false }: Props) {
  return (
    <>
      <a
        href="/"
        className={`
          block focus-visible:outline outline-2 outline-offset-2 outline-yellow-500 bg-yellow-300 rounded-full relative overflow-hidden transform motion-safe:transition-transform hover:scale-110 focus:scale-110 hover:rotate-[-10deg] focus:rotate-[-10deg]
          shadow-[0_0_15px_0_rgba(250,204,21,0.15),0_0_25px_0_rgba(250,204,21,0.5),0_0_50px_0_rgba(250,204,21,0.25)]
          dark:shadow-[0_0_15px_0_rgba(250,204,21,0.25),0_0_25px_0_rgba(250,204,21,0.5),0_0_50px_0_rgba(250,204,21,0.25)]
          ${small ? 'hover:translate-y-2 focus:translate-y-2' : ''}
        `}
      >
        <img
          className={`rounded-full relative ${small && 'rotate-180'}`}
          src={`${EMOJI_URL}${symbol}`}
          alt={`${symbol} emoji in a yellow circle`}
          width="80"
          height="80"
        />
      </a>
      {photo && (
        <div className="rounded-full overflow-hidden -ml-4">
          <img
            alt="Charlie Gleason"
            src={`/assets/avatars/avatar-charlie-${photo}.jpg`}
            width="80"
            height="80"
          />
        </div>
      )}
    </>
  )
}
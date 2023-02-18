import { Dribbble, Twitter, GitHub, Email } from '~/components/ui/icon'
import Social from '~/components/ui/links/social'

export default function Links() {
  return (
    <div className="flex flex-wrap justify-between gap-y-2">
      <Social
        icon={Twitter}
        title="Twitter"
        url="https://twitter.com/superhighfives"
      />
      <Social
        icon={Dribbble}
        title="Dribbble"
        url="https://dribbble.com/superhighfives"
      />
      <Social
        icon={GitHub}
        title="GitHub"
        url="https://github.com/superhighfives"
      />
      <Social icon={Email} title="Email" url="mailto:hi@charliegleason.com" />
    </div>
  )
}

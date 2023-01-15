import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { requireUserId } from '~/session.server'

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request)

  return json({})
}

export default function CasePage() {
  return (
    <div>
      <p>
        Send us your evil deed ideas and you might appear in the next episode of
        Dragon's Den
      </p>
    </div>
  )
}

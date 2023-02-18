import type { ActionArgs, LoaderArgs } from '@remix-run/cloudflare'
import { logout } from '~/session.server'

export async function action({ request, context }: ActionArgs) {
  return logout(request, context)
}

export async function loader({ request, context }: LoaderArgs) {
  return logout(request, context)
}

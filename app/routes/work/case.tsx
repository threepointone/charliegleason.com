import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { requireUserId } from '~/session.server'
import { useLoaderData } from '@remix-run/react'
import Link from '~/components/ui/link'

export async function loader({ request, context }: LoaderArgs) {
  const userId = await requireUserId(request, context)
  return json({ userId })
}

export default function CasePage() {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Private Area</h1>
      <p>Logged in as {data.userId}</p>
      <Link href="/logout">Logout</Link>
    </div>
  )
}

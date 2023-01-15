import type { LoaderArgs, ActionArgs } from '@remix-run/cloudflare'

import { Form, useSearchParams } from '@remix-run/react'
import { json, redirect } from '@remix-run/cloudflare'

import { getUserId } from '~/session.server'
import { createUserSession } from '~/session.server'

import { safeRedirect } from '~/utils/user'

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)

  if (userId) {
    return redirect('/')
  }

  return json({})
}

export async function action({ request, context }: ActionArgs) {
  const formData = await request.formData()
  const redirectTo = safeRedirect(formData.get('redirectTo'))

  const password = formData.get('password')
  const user = password === context.AUTH_PASSWORD ? { id: 'guest' } : false

  if (!user) {
    // return json({ error: 'Invalid login' }, { status: 401 })
    const searchParams = new URLSearchParams([
      ['redirectTo', redirectTo],
      ['error', 'unauthorized'],
    ])
    throw redirect(`/login?${searchParams}`)
  }

  return createUserSession({
    request,
    userId: user.id,
    redirectTo,
  })
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'
  const unauthorized = searchParams.get('error') === 'unauthorized'
  console.log(unauthorized)

  return (
    <Form method="post">
      {unauthorized ? <p>Nope</p> : null}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <button type="submit">Log in</button>
    </Form>
  )
}

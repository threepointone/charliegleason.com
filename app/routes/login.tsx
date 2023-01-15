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

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const redirectTo = safeRedirect(formData.get('redirectTo'))

  const password = formData.get('password')

  // Perform form validation
  // For example, check the email is a valid email
  // Return the errors if there are any

  // const user = await verifyLogin(email, password)
  const user = password === 'puppies' ? { id: 'guest' } : false

  // If no user is returned, return the error

  if (!user) {
    return json({ error: 'Invalid login' }, { status: 401 })
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

  return (
    <Form method="post">
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

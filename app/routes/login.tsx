import type { LoaderArgs, ActionArgs } from '@remix-run/cloudflare'

import { Form, useSearchParams } from '@remix-run/react'
import { json, redirect } from '@remix-run/cloudflare'

import { getUserId } from '~/session.server'
import { createUserSession } from '~/session.server'

import { safeRedirect } from '~/utils/user'

import type { MetaFunction } from '@remix-run/cloudflare'

import Header from '~/components/ui/header'
import Links from '~/components/sections/links'
import Layout from '~/components/ui/layout'
import Sections from '~/components/ui/sections'
import Footer from '~/components/sections/footer'

import tags from '~/utils/tags'

export const meta: MetaFunction = () => {
  return tags({
    title: 'Login! Charlie Gleason is hiding!',
    description:
      'Designer, developer, creative coder, musician, and login page enthusiast.',
    image: 'https://charliegleason.com/social-error.png',
    emoji: '🙈',
  })
}

export async function loader({ request, context }: LoaderArgs) {
  const userId = await getUserId(request, context)

  if (userId) {
    return redirect('/')
  }

  return json(null, { status: 400 })
}

export async function action({ request, context }: ActionArgs) {
  const formData = await request.formData()
  const redirectTo = safeRedirect(formData.get('redirectTo'))

  const password = formData.get('password')
  const user = password === context.AUTH_PASSWORD ? { id: 'guest' } : false

  if (!user) {
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
    context,
  })
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'
  const unauthorized = searchParams.get('error') === 'unauthorized'

  return (
    <>
      <Layout>
        <Header symbol="🙈" photo="01" small />
        <Sections>
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
          <Links />
        </Sections>
        <Footer />
      </Layout>
    </>
  )
}

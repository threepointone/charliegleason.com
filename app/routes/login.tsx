import type { LoaderArgs, ActionArgs } from '@remix-run/cloudflare'

import { Form, useSearchParams } from '@remix-run/react'
import { json, redirect } from '@remix-run/cloudflare'

import { getUserId } from '~/session.server'
import { createUserSession } from '~/session.server'

import { safeRedirect } from '~/utils/user'

import type { MetaFunction } from '@remix-run/cloudflare'

import Avatar from '~/components/ui/avatar'

import tags from '~/utils/tags'
import HorizontalRule from '~/components/ui/hr'

export const meta: MetaFunction = () => {
  return tags({
    title: 'Login! Charlie Gleason is hiding!',
    description:
      'Designer, developer, creative coder, musician, and login page enthusiast.',
    image: 'https://charliegleason.com/social-error.png',
    emoji: '🤙',
  })
}

export async function loader({ request, context }: LoaderArgs) {
  const userId = await getUserId(request, context)

  if (userId) {
    return redirect('/')
  }

  return json(null, { status: 200 })
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
  const symbol = unauthorized ? '💀' : '🙈'

  return (
    <>
      <div className="grid place-items-center h-full">
        <div className="flex items-center space-x-4">
          <div className="flex">
            <Avatar symbol={symbol} photo="01" />
          </div>
          <div className="max-w-xs space-y-0">
            <hgroup className="inline-flex whitespace-nowrap space-x-1 font-display uppercase tracking-wider text-xs">
              <h1>C#@rl!e G/3as0n</h1>
              <h2 className="bg-yellow-800 dark:bg-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 dark:from-yellow-500 to-transparent">
                needs you to log in
              </h2>
            </hgroup>
            <div className="space-y-4">
              <h1 className="font-mono text-lg">This is a protected area.</h1>
              <HorizontalRule />
              <Form method="post" className="h-full">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <div
                        className="h-5 w-5 bg-neutral-400 dark:bg-neutral-800"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block w-full rounded-none rounded-l-md bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 pl-10 focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                      placeholder="Enter password..."
                    />
                  </div>
                  <input type="hidden" name="redirectTo" value={redirectTo} />
                  <button
                    type="button"
                    className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-400 hover:bg-neutral-100  dark:hover:bg-neutral-800 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  >
                    <div
                      className="h-5 w-5 bg-neutral-400 dark:bg-neutral-800"
                      aria-hidden="true"
                    />
                    <span>Sort</span>
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

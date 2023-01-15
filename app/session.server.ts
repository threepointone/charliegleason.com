import type { User } from '~/models/user.server'
import { getUserById } from '~/models/user.server'
import { createCookieSessionStorage, redirect } from '@remix-run/cloudflare'

const USER_SESSION_KEY = 'userId'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['puppies'],
  },
})

export async function getUserId(
  request: Request
): Promise<User['id'] | undefined> {
  const session = await getSession(request)
  const userId = session.get(USER_SESSION_KEY)
  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (userId === undefined) return null

  const user = await getUserById(userId)
  if (user) return user

  throw await logout(request)
}

export async function createUserSession({
  request,
  userId,
  redirectTo,
}: {
  request: Request
  userId: string
  redirectTo: string
}) {
  const session = await getSession(request)
  session.set(USER_SESSION_KEY, userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days,
      }),
    },
  })
}

async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

export async function logout(request: Request) {
  const session = await getSession(request)
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request)
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}

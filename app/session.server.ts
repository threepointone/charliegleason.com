import type { User } from '~/models/user.server'
import { getUserById } from '~/models/user.server'
import { createCookieSessionStorage, redirect } from '@remix-run/cloudflare'
import type { AppLoadContext } from '@remix-run/cloudflare'

const USER_SESSION_KEY = 'userId'

export function getSessionStorage(context: AppLoadContext) {
  if (!context.lobby.env.SESSION_SECRET)
    throw new Error('SESSION_SECRET is not defined')

  return createCookieSessionStorage({
    cookie: {
      name: 'charlie_gleason_dot_com_remix',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [context.lobby.env.SESSION_SECRET as string],
    },
  })
}

export async function getUserId(
  request: Request,
  context: AppLoadContext
): Promise<User['id'] | undefined> {
  const session = await getSession(request, context)
  const userId = session.get(USER_SESSION_KEY)
  return userId
}

export async function getUser(request: Request, context: AppLoadContext) {
  const userId = await getUserId(request, context)
  if (userId === undefined) return null

  const user = await getUserById(userId)
  if (user) return user
}

export async function createUserSession({
  request,
  userId,
  redirectTo,
  context,
}: {
  request: Request
  userId: string
  redirectTo: string
  context: AppLoadContext
}) {
  const sessionStorage = getSessionStorage(context)
  const session = await getSession(request, context)
  session.set(USER_SESSION_KEY, userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days,
      }),
    },
  })
}

export async function getSession(request: Request, context: AppLoadContext) {
  const sessionStorage = getSessionStorage(context)
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

export async function logout(request: Request, context: AppLoadContext) {
  const sessionStorage = getSessionStorage(context)
  const session = await getSession(request, context)
  session.set(USER_SESSION_KEY, null)
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}

export async function requireUserId(
  request: Request,
  context: AppLoadContext,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request, context)
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}

/*
 * If you're looking to learn more about how themeing is set up,
 * you should absolute read Matt Stobb's Complete Guide to Dark Mode
 * with Remix (https://mattstobbs.com/remix-dark-mode)
 */

import { createCookieSessionStorage } from '@remix-run/cloudflare'

import type { Theme } from './theme-provider'
import { isTheme } from './theme-provider'

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'charlie_gleason_dot_com_remix',
    secure: true,
    secrets: ['Secure, but with puppies!'],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
})

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))
  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      return isTheme(themeValue) ? themeValue : null
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  }
}

export { getThemeSession }

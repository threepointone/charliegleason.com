/*
 * If you're looking to learn more about how themeing is set up,
 * you should absolute read Matt Stobb's Complete Guide to Dark Mode
 * with Remix (https://mattstobbs.com/remix-dark-mode)
 */

import type { AppLoadContext } from '@remix-run/cloudflare'
import { getSessionStorage, getSession } from '~/session.server'

import type { Theme } from './theme-provider'
import { isTheme } from './theme-provider'

async function getThemeSession(request: Request, context: AppLoadContext) {
  const sessionStorage = getSessionStorage(context)
  const session = await getSession(request, context)
  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      return isTheme(themeValue) ? themeValue : null
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => sessionStorage.commitSession(session),
  }
}

export { getThemeSession }

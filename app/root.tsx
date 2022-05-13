import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useCatch,
} from '@remix-run/react'

import { DynamicLinks } from 'remix-utils'

import tailwind from './styles/app.css'
import { EMOJI_URL } from './constants'
import Error from '~/components/sections/error'
import emojiList from './utils/emoji-list'
import { sampleSize, random } from 'lodash'
import tags from './utils/tags'

import clsx from 'clsx'
import type { Theme } from '~/utils/theme-provider'
import { getThemeSession } from './utils/theme.server'
import {
  ThemeProviderSetup,
  ThemeProvider,
  useTheme,
} from '~/utils/theme-provider'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: 'https://use.typekit.net/qjo1mgb.css' },
    { rel: 'icon', type: 'image/png', href: `${EMOJI_URL}${'🙈'}` },
  ]
}

export const meta: MetaFunction = () => {
  return tags({
  title: 'Charlie Gleason',
  description: 'Designer, developer, creative coder, and musician.',
  image: 'https://charliegleason.com/social-error.png',
  })
}

export type LoaderData = {
  theme: Theme | null
  symbol: string
  photo: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)

  const data: LoaderData = {
    theme: themeSession.getTheme(),
    symbol: sampleSize(emojiList, Math.ceil(Math.random() * 3)).join(''),
    photo: `0${random(1, 4)}`,
  }

  console.log(data.symbol)

  return data
}

// TODO: Sort 404 / 500
export function CatchBoundary() {
  const caught = useCatch()
  return (
    <html className="dark grayscale">
      <head>
        <title>500! Error! Charlie Gleason is having some issues!</title>
        <Meta />
        <Links />
        <DynamicLinks />
      </head>
      <body>
        <Error {...caught} />
        <Scripts />
      </body>
    </html>
  )
}

function App() {
  const data = useLoaderData<LoaderData>()
  const [theme] = useTheme()
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <ThemeProviderSetup ssrTheme={Boolean(data.theme)} />
        <Meta />
        <Links />
        <DynamicLinks />
      </head>
      <body>
        <div id="__root">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === 'development' && <LiveReload />}
        </div>
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>()
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  )
}

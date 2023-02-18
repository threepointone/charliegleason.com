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

import { cssBundleHref } from '@remix-run/css-bundle'
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

import { getUser } from './session.server'
import type { User } from './models/user.server'

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: 'https://use.typekit.net/qjo1mgb.css' },
  ]
}

export const meta: MetaFunction = () => {
  return tags({
    title:
      'Charlie Gleason • Designer, developer, creative coder, and musician.',
    description:
      'I’m a user interface / user experience lead at Salesforce. Before that I looked after design and front-end development for the London-based crowdfunding publisher Unbound and the Melbourne-based social film site Goodfilms, and was the technical lead of the Clemenger BBDO ad agency. I studied design and computer science, and I like the space between art and code. I also enjoy the blind terror of the creative process, solving difficult problems, and a clean sheet of paper. I cannot skateboard. I tried, but it was a whole thing.',
    image: 'https://charliegleason.com/social-error.png',
  })
}

export type LoaderData = {
  theme: Theme | null
  symbol: string
  photo: string
  user: User
}

export const loader: LoaderFunction = async ({ request, context }) => {
  const themeSession = await getThemeSession(request, context)

  const data: LoaderData = {
    theme: themeSession.getTheme(),
    symbol: sampleSize(emojiList, Math.ceil(Math.random() * 3)).join(''),
    photo: `${random(1, 10).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`,
    user: await getUser(request, context),
  }

  return data
}

export function CatchBoundary() {
  const caught = useCatch()
  return (
    <html className="dark grayscale">
      <head>
        <title>500! Error! Charlie Gleason is having some issues!</title>
        <Meta />
        <Links />
        <link
          rel="icon"
          type="image/svg"
          href={`${EMOJI_URL}${'🙈'}?animated=false`}
        />
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
          <LiveReload />
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

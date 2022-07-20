import type { MetaFunction, LinksFunction } from '@remix-run/cloudflare'
import type { LoaderData } from '~/root'
import type { DynamicLinksFunction } from 'remix-utils'

import Header from '~/components/ui/header'
import Introduction from '~/components/sections/introduction'
import Selected from '~/components/sections/selected'
import Links from '~/components/sections/links'
import Quotes from '~/components/sections/quotes'
import Events from '~/components/sections/events'
import Layout from '~/components/ui/layout'
import Sections from '~/components/ui/sections'
import Footer from '~/components/sections/footer'
import tags from '~/utils/tags'

import { projects, articles, features } from '~/data'
import { useMatches } from '@remix-run/react'
import { useRouteData } from 'remix-utils'
import { EMOJI_URL } from '../constants'

let dynamicLinks: DynamicLinksFunction<LoaderData> = ({ data }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { symbol } = useRouteData('root') ?? { symbol: '💀' }
  return [
    {
      rel: 'icon',
      type: 'image/svg',
      href: `${EMOJI_URL}${symbol}?animated=false`,
    },
  ]
}

export const handle = { dynamicLinks }

export const meta: MetaFunction = () => {
  return tags({
    title: 'Charlie Gleason',
    image: 'https://charliegleason.com/social-default.png',
  })
}

export default function IndexRoute() {
  const { symbol, photo } = useMatches().find((route) => route.id === 'root')
    ?.data ?? { symbol: '💀', photo: '01' }

  return (
    <>
      <Layout>
        <Header symbol={symbol} photo={photo} />
        <Sections>
          <Introduction />
          <Selected sections={[projects, articles, features]} />
          <Quotes />
          <Events />
          <Links />
        </Sections>
        <Footer />
      </Layout>
    </>
  )
}

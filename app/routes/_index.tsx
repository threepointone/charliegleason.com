import Header from '~/components/ui/header'
import Overview from '~/components/sections/overview'
import Work from '~/components/sections/work'
import Selected from '~/components/sections/selected-redux'
import Links from '~/components/sections/links'
import Quotes from '~/components/sections/quotes'
import Layout from '~/components/ui/layout'
import Sections from '~/components/ui/sections'
import Footer from '~/components/sections/footer'

import { projects, articles, features } from '~/data'
import { useMatches } from '@remix-run/react'
import { EMOJI_URL } from '../constants'

import type { MetaFunction, LoaderFunction, LoaderFunctionArgs } from 'partymix'

import SharedSpace from '~/components/ui/cursors/shared-space'
import CursorsContextProvider from '~/components/ui/cursors/cursors-context'

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentsData = matches[0].data
  const parentsMeta = matches[0].meta

  return [
    ...parentsMeta,
    {
      tagName: 'link',
      rel: 'icon',
      type: 'image/svg',
      href: `${EMOJI_URL}${parentsData.symbol || '💀'}?animated=false`,
    },
  ]
}

export const loader: LoaderFunction = async function ({
  context,
}: LoaderFunctionArgs) {
  // You can use context.lobby to read vars, communicate with parties,
  // read from ai models or the vector db, and more.
  //
  // See https://docs.partykit.io/reference/partyserver-api/#partyfetchlobby
  // for more info.
  return Response.json({ partykitHost: PARTYKIT_HOST })
}

export default function IndexRoute() {
  const { symbol, photo, user } = useMatches().find(
    (route) => route.id === 'root'
  )?.data ?? { symbol: '💀', photo: '01', user: { id: 'unauthenticated' } }

  return (
    <>
      <Layout wide>
        <Header symbol={symbol} photo={photo} />
        <Sections>
          <CursorsContextProvider>
            <SharedSpace />
          </CursorsContextProvider>
          <Overview />
          <Work />
          <Selected sections={[projects, articles, features]} />
          <Quotes />
          <Links />
        </Sections>
        <Footer user={user} />
      </Layout>
    </>
  )
}

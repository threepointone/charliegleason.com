import { logDevReady } from '@remix-run/cloudflare'
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'

if (process.env.NODE_ENV === 'development') {
  logDevReady(build)
}

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLoadContext: (context: any) => context.env,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onRequest(context: any) {
  return handleRequest(context)
}

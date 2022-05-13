import type { LoaderFunction } from '@remix-run/cloudflare'

import { json } from '@remix-run/cloudflare'

export const loader: LoaderFunction = async () => {
  throw json(null, { status: 500, statusText: "Error Message" });
}

export default function ErrorRoute() {}

import type { HtmlMetaDescriptor } from "@remix-run/cloudflare"

type Props = {
  title?: string
  description?: string
  image?: string
  emoji?: string
}

type Meta = {
  charset: string
  viewport: string
  title?: string
  'og:title'?: string
  description?: string
  'og:description'?: string
  image?: string
  'og:image'?: string
}

function Tags(props: Props) {
  const tags: Meta = {
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
  }

  if (props.title) {
    tags.title = props.title
  }

  if (props.description) {
    tags.description = props.description
    tags['og:description'] = props.description
  }

  if (props.image) {
    tags.image = props.image
    tags['og:image'] = props.image
  }

  return tags as HtmlMetaDescriptor
}

export default Tags

import { json, html } from 'remix-utils'
import emojiList from '~/utils/emoji-list'
import sampleSize from 'lodash/sampleSize'

import EmojiRegex from 'emoji-regex'
import GraphemeSplitter from 'grapheme-splitter'
import nodeEmoji from 'node-emoji'
import { Buffer } from '../../utils/buffer.server'

type EmojiResponse = {
  error?: string
  success?: string[]
}

type ResourceResponse = {
  response: EmojiResponse
}

function fetchEmoji(emoji: string) {
  const splitter = new GraphemeSplitter()
  const emojiRegex = EmojiRegex()

  const validInput = emoji === 'random' || emoji.match(emojiRegex)
  if (!validInput) {
    return { error: 'Invalid input' }
  }

  const input: string[] =
    emoji === 'random'
      ? sampleSize(emojiList, Math.ceil(Math.random() * 3))
      : splitter.splitGraphemes(emoji)

  const output = input
    .filter((emoji) => emoji.match(emojiRegex))
    .filter((emoji) => emojiList.includes(emoji))

  return { success: output }
}

function handleResponse(response: EmojiResponse) {
  if (response.error) {
    return {
      response: { error: response.error },
    }
  }

  if (response.success) {
    if (response.success.length <= 0) {
      return {
        response: {
          error: 'Not enough emoji',
        },
      }
    }

    if (response.success.length > 3) {
      return {
        response: {
          error: 'Too many emoji',
        },
      }
    }

    return {
      response: {
        success: response.success,
      },
    }
  }
}

async function fetchImageToBase64({ key }: string) {
  const response = await fetch(`http://localhost:8788/assets/emoji/${key}.png`)
  const arrayBuffer = Buffer.from(await response.arrayBuffer())
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
  return base64
}

export async function loader({ params }: any) {
  const emoji = params.emoji
  const output = fetchEmoji(emoji)

  const result: ResourceResponse = handleResponse(output)!
  const repsonseType = result.response.error ? 404 : 200

  const key = nodeEmoji.find(emoji).key
  const leading = sampleSize(emojiList, 10).map(
    (emoji) => nodeEmoji.find(emoji).key
  )

  return html(
    `
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="#eab308" />  
      <image width="80" height="80" href="data:image/png;charset=utf-8;base64,${await fetchImageToBase64(
        key
      )}" />
      ${leading.map(
        async (emoji) =>
          `<image width="80" height="80" href="data:image/png;charset=utf-8;base64,${await fetchImageToBase64(
            emoji
          )}" />`
      )}
    </svg>
  `,
    repsonseType
  )
}

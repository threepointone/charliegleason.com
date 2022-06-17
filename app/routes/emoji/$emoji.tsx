import { json } from 'remix-utils'
import emojiList from '~/utils/emoji-list'
import sampleSize from 'lodash/sampleSize'

import EmojiRegex from 'emoji-regex';
import GraphemeSplitter from 'grapheme-splitter'


type EmojiResponse = {
  error?: string
  success?: string[]
}

type ResourceResponse = {
  response: EmojiResponse
}

function fetchEmoji(emoji: string) {
  const splitter = new GraphemeSplitter()
  const emojiRegex = EmojiRegex();

  const validInput = emoji === "random" || emoji.match(emojiRegex)
  if(!validInput) {
    return { error: "Invalid input" }
  }

  const input:string[] =
    emoji === 'random'
      ? sampleSize(emojiList, Math.ceil(Math.random() * 3))
      : splitter.splitGraphemes(emoji)

  const output = input
  .filter(emoji => emoji.match(emojiRegex))
  .filter(emoji => emojiList.includes(emoji))

  return { success: output }
}

function handleResponse(response:EmojiResponse) {
  if(response.error) {
    return {
      response: {error: response.error}
    }
  }

  if(response.success) {
    if(response.success.length <= 0) {
      return { response: {
        error: "Not enough emoji"
      }}
    }

    if(response.success.length > 3) {
      return { response: {
        error: "Too many emoji"
      }}
    }

    return { response: {
      success: response.success
    }}
  }
}

export async function loader({ params }: any) {
  const emoji = params.emoji
  const output = fetchEmoji(emoji)

  const result:ResourceResponse = handleResponse(output)!

  return json(result, result.response.error ? 404 : 200)

  // return new Response(data, {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "json/text",
  //   },
  // });
}

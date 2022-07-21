import type { Glyph } from 'fontkit'
import type { Canvas } from 'canvas'

import fs from 'fs'
import fontkit from 'fontkit'
import nodeEmoji from 'node-emoji'
import requiredEmoji from '../app/utils/emoji-list'
import { Image, createCanvas } from 'canvas'

import sharp from 'sharp'

const font = fontkit.openSync(
  '/System/Library/Fonts/Apple Color Emoji.ttc',
  'AppleColorEmoji'
)

interface ExtendedGlyph extends Glyph {
  getImageForSize: (size: number) => {}
  data: any
}

if (font) {
  const canvasSize = 160
  const imagePadding = 0

  const allEmoji: { [key: string]: string } = Object.fromEntries(
    Object.entries(nodeEmoji.emoji).filter(([key, emoji]) =>
      requiredEmoji.includes(emoji)
    )
  )

  Object.keys(allEmoji).forEach((id: string) => {
    const emoji: string = allEmoji[id]

    console.log(`Generating ${id}: ${emoji}`)

    const canvas = createCanvas(canvasSize, canvasSize)
    const ctx = canvas.getContext('2d')

    const run = font.layout(emoji)
    const glyph = (run.glyphs[0] as ExtendedGlyph).getImageForSize(
      canvasSize
    ) as { data: Buffer }

    if (glyph?.data) {
      new Promise<Canvas>((resolve, reject) => {
        const emojiImg = new Image()

        emojiImg.onload = () => {
          const tempCanvas = createCanvas(canvasSize, canvasSize)
          const tempCtx = tempCanvas.getContext('2d')
          tempCtx.drawImage(emojiImg, 0, 0)
          let imageData = tempCtx.getImageData(0, 0, canvasSize, canvasSize)

          // Monochrome
          for (var i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] =
              imageData.data[i + 1] =
              imageData.data[i + 2] =
                parseInt(
                  (0.2125 * imageData.data[i] +
                    0.7154 * imageData.data[i + 1] +
                    0.0721 * imageData.data[i + 2]) as unknown as string,
                  10
                )
          }

          // Contrast
          const contrast = 50 / 100 + 1 // convert to decimal & shift range: [0..2]
          const intercept = 128 * (1 - contrast)
          for (var i = 0; i < imageData.data.length; i += 4) {
            //r,g,b,a
            imageData.data[i] = imageData.data[i] * contrast + intercept
            imageData.data[i + 1] = imageData.data[i + 1] * contrast + intercept
            imageData.data[i + 2] = imageData.data[i + 2] * contrast + intercept
          }

          tempCtx.putImageData(imageData, 0, 0)
          ctx.drawImage(
            tempCanvas,
            imagePadding / 2,
            imagePadding / 2,
            canvasSize - imagePadding,
            canvasSize - imagePadding
          )
          return resolve(canvas)
        }

        emojiImg.src = glyph.data
      }).then(async (canvas: Canvas) => {
        console.log(`✅ Generated ${id}: ${emoji}`)
        var buffer = canvas.toBuffer()
        const image = await sharp(buffer).png({ quality: 75 })
        await image.toFile(`public/assets/emoji/${id}.png`)
      })
    } else {
      console.log(`Skipping ${id}: ${emoji}`)
    }
  })
} else {
  console.error('Font not found')
}

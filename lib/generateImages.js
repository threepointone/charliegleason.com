const fs = require('fs')
const fontkit = require('fontkit')
const nodeEmoji = require('node-emoji')
const { Image, createCanvas } = require('canvas')
const font = fontkit.openSync(
  '/System/Library/Fonts/Apple Color Emoji.ttc',
  'AppleColorEmoji'
)

if (font) {
  const canvasSize = 512
  const imagePadding = 0
  const emojiList = nodeEmoji.emoji

  Object.keys(emojiList).forEach((key) => {
    const id = key
    const emoji = emojiList[key]

    console.log(`Generating ${key}: ${emoji}`)

    const canvas = createCanvas(canvasSize, canvasSize)
    const ctx = canvas.getContext('2d')

    const run = font.layout(emoji)
    const glyph = run.glyphs[0].getImageForSize(canvasSize)

    if (glyph?.data) {
      new Promise((resolve, reject) => {
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
                  0.2125 * imageData.data[i] +
                    0.7154 * imageData.data[i + 1] +
                    0.0721 * imageData.data[i + 2],
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
          resolve(canvas)
        }

        emojiImg.src = glyph.data
      }).then((canvas) => {
        console.log(`✅ Generated ${key}: ${emoji}`)
        var buffer = canvas.toBuffer()
        fs.writeFileSync(`public/emoji/${key}.png`, buffer)
      })
    } else {
      console.log(`Skipping ${key}: ${emoji}`)
    }
  })
} else {
  console.error('Font not found')
}

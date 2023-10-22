export default function (data, options) {
  const imageData = data.filter(d => {
    if (options.type) {
      if (d && "type" in d) return d.type === options.type
    } else if (options.name) {
      if (d && "name" in d) return d.name === options.name
    } else {
      if (d && "value" in d) return d.value === options.value
    }
  })

  if (imageData.length) {
    if (options.name && options.name === "Crystal structure") {
      const crystalImg = []
      imageData.map(d => {
        crystalImg.push({
          content_url: d.images[0].content_url ?? null,
          alternative_text: d.images[0].alternative_text ?? null,
          caption: d.images[0].caption ?? null,
          height: d.images[0].height ?? null,
          width: d.images[0].width ?? null,
        })
      })
      return crystalImg
    } else
      return {
        content_url: imageData[0].images[0].content_url ?? null,
        alternative_text: imageData[0].images[0].alternative_text ?? null,
        caption: imageData[0].images[0].caption ?? null,
        height: imageData[0].images[0].height ?? null,
        width: imageData[0].images[0].width ?? null,
      }
  } else return
}

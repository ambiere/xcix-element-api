var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __hasOwnProp = Object.prototype.hasOwnProperty
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true })
}
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", { value: true }), mod)

// src/server/util/getImageData.mjs
var getImageData_exports = {}
__export(getImageData_exports, {
  default: () => getImageData_default,
})
module.exports = __toCommonJS(getImageData_exports)
function getImageData_default(data, options) {
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

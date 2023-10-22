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
  var _a, _b, _c, _d, _e
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
        var _a2, _b2, _c2, _d2, _e2
        crystalImg.push({
          content_url: (_a2 = d.images[0].content_url) != null ? _a2 : null,
          alternative_text: (_b2 = d.images[0].alternative_text) != null ? _b2 : null,
          caption: (_c2 = d.images[0].caption) != null ? _c2 : null,
          height: (_d2 = d.images[0].height) != null ? _d2 : null,
          width: (_e2 = d.images[0].width) != null ? _e2 : null,
        })
      })
      return crystalImg
    } else
      return {
        content_url: (_a = imageData[0].images[0].content_url) != null ? _a : null,
        alternative_text: (_b = imageData[0].images[0].alternative_text) != null ? _b : null,
        caption: (_c = imageData[0].images[0].caption) != null ? _c : null,
        height: (_d = imageData[0].images[0].height) != null ? _d : null,
        width: (_e = imageData[0].images[0].width) != null ? _e : null,
      }
  } else return
}

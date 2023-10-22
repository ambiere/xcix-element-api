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

// src/server/util/getAllotropes.mjs
var getAllotropes_exports = {}
__export(getAllotropes_exports, {
  default: () => getAllotropes_default,
})
module.exports = __toCommonJS(getAllotropes_exports)
function getAllotropes_default(data, elementName) {
  const data_ = data.find(d => d && d.name === "Allotropes")
  return data_
    ? {
        value: data_.value,
        links: data_.links && {
          ...data_.links.find(link => link.text === `Allotropes of ${elementName.toLowerCase()}`),
        },
      }
    : null
}

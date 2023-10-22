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

// src/server/util/paginate.mjs
var paginate_exports = {}
__export(paginate_exports, {
  default: () => paginate_default,
})
module.exports = __toCommonJS(paginate_exports)
function paginate_default() {
  return (Array.prototype.paginate = function (page = 1, limit = this.length) {
    const startPosition = Number(--page) * Number(limit) || 0
    const endPosition = startPosition + Number(limit) || limit
    if (++page > 0) {
      if (startPosition < this.length) {
        return this.slice(startPosition != null ? startPosition : 0, endPosition)
      }
      return { error: "_page number out of data length" }
    }
    return { error: "_page number can not be zero" }
  })
}

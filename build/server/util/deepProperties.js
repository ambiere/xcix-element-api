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

// src/server/util/deepProperties.mjs
var deepProperties_exports = {}
__export(deepProperties_exports, {
  default: () => deepProperties_default,
})
module.exports = __toCommonJS(deepProperties_exports)
function deepProperties_default(match, deepProps) {
  const _deepProps = deepProps[0][0].split(".")
  const levelOne = _deepProps[0]
  const levelTwo = _deepProps[1]
  const levelThree = deepProps.length > 2 && _deepProps[2]
  const levelFour = deepProps.length > 3 && _deepProps[3]
  return {
    [levelTwo]: levelThree
      ? levelFour
        ? match[levelOne][levelTwo][levelThree][levelFour]
        : match[levelOne][levelTwo][levelThree]
      : match[levelOne][levelTwo],
  }
}

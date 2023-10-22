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

// src/server/util/filter.mjs
var filter_exports = {}
__export(filter_exports, {
  default: () => filter_default,
})
module.exports = __toCommonJS(filter_exports)

// node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs
var enabled = true
var globalVar =
  typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : {}
var supportLevel = 0
if (globalVar.process && globalVar.process.env && globalVar.process.stdout) {
  const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, COLORTERM } = globalVar.process.env
  if (NODE_DISABLE_COLORS || NO_COLOR || FORCE_COLOR === "0") {
    enabled = false
  } else if (FORCE_COLOR === "1" || FORCE_COLOR === "2" || FORCE_COLOR === "3") {
    enabled = true
  } else if (TERM === "dumb") {
    enabled = false
  } else if (
    "CI" in globalVar.process.env &&
    ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some(
      vendor => vendor in globalVar.process.env,
    )
  ) {
    enabled = true
  } else {
    enabled = process.stdout.isTTY
  }
  if (enabled) {
    if (process.platform === "win32") {
      supportLevel = 3
    } else {
      if (COLORTERM && (COLORTERM === "truecolor" || COLORTERM === "24bit")) {
        supportLevel = 3
      } else if (TERM && (TERM.endsWith("-256color") || TERM.endsWith("256"))) {
        supportLevel = 2
      } else {
        supportLevel = 1
      }
    }
  }
}
var options = {
  enabled,
  supportLevel,
}
function kolorist(start, end, level = 1) {
  const open = `\x1B[${start}m`
  const close = `\x1B[${end}m`
  const regex = new RegExp(`\\x1b\\[${end}m`, "g")
  return str => {
    return options.enabled && options.supportLevel >= level ? open + ("" + str).replace(regex, open) + close : "" + str
  }
}
var reset = kolorist(0, 0)
var bold = kolorist(1, 22)
var dim = kolorist(2, 22)
var italic = kolorist(3, 23)
var underline = kolorist(4, 24)
var inverse = kolorist(7, 27)
var hidden = kolorist(8, 28)
var strikethrough = kolorist(9, 29)
var black = kolorist(30, 39)
var red = kolorist(31, 39)
var green = kolorist(32, 39)
var yellow = kolorist(33, 39)
var blue = kolorist(34, 39)
var magenta = kolorist(35, 39)
var cyan = kolorist(36, 39)
var white = kolorist(97, 39)
var gray = kolorist(90, 39)
var lightGray = kolorist(37, 39)
var lightRed = kolorist(91, 39)
var lightGreen = kolorist(92, 39)
var lightYellow = kolorist(93, 39)
var lightBlue = kolorist(94, 39)
var lightMagenta = kolorist(95, 39)
var lightCyan = kolorist(96, 39)
var bgBlack = kolorist(40, 49)
var bgRed = kolorist(41, 49)
var bgGreen = kolorist(42, 49)
var bgYellow = kolorist(43, 49)
var bgBlue = kolorist(44, 49)
var bgMagenta = kolorist(45, 49)
var bgCyan = kolorist(46, 49)
var bgWhite = kolorist(107, 49)
var bgGray = kolorist(100, 49)
var bgLightRed = kolorist(101, 49)
var bgLightGreen = kolorist(102, 49)
var bgLightYellow = kolorist(103, 49)
var bgLightBlue = kolorist(104, 49)
var bgLightMagenta = kolorist(105, 49)
var bgLightCyan = kolorist(106, 49)
var bgLightGray = kolorist(47, 49)

// src/server/util/filter.mjs
function filter_default() {
  Array.prototype.filterElements = function (query) {
    let thisArray = this
    let elements = null
    let matchedElements = /* @__PURE__ */ new Set()
    let iteration = 0
    try {
      while (iteration < query.length) {
        const _query = query[iteration]
        const _queryRegex = new RegExp(_query[1], "i")
        if (_query[0] === "group" || _query[0] === "period") {
          !elements
            ? (elements = thisArray.filter(element => element[_query[0]] === Number(_query[1])))
            : (elements = elements.filter(element => element[_query[0]] === Number(_query[1])))
        } else {
          !elements
            ? (elements = thisArray.filter(element => String(element[_query[0]]).match(_queryRegex)))
            : (elements = elements.filter(element => String(element[_query[0]]).match(_queryRegex)))
        }
        iteration++
      }
      elements.map(element => matchedElements.add(JSON.stringify(element)))
      return [...matchedElements.values()].map(val => JSON.parse(val))
    } catch (error) {
      console.log(red(`[FilterElements Function] ${error}`))
    }
  }
}

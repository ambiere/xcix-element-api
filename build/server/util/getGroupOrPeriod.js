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

// src/server/util/getGroupOrPeriod.mjs
var getGroupOrPeriod_exports = {}
__export(getGroupOrPeriod_exports, {
  default: () => getGroupOrPeriod_default,
})
module.exports = __toCommonJS(getGroupOrPeriod_exports)

// src/server/util/getValue.mjs
function getValue_default(data, key) {
  const _data = data.filter(d => {
    if (d && typeof key === "string" && "name" in d) {
      return /Ioni(z|s)ation energies/i.test(key) ? /Ioni(z|s)ation energies/i.test(d.name) : d.name === key
    } else if (d && "type" in d && !/Ioni(z|s)ation energies/i.test(d.name) && d.type === key.type)
      return d.type === key.type
  })
  if (key != "Crystal structure")
    return _data[0] ? (key.type || /Ioni(z|s)ation energies/i.test(key) ? _data[0].values : _data[0].value) : null
  else {
    const crystalVal = []
    _data.map(d => {
      crystalVal.push(d.value)
    })
    return crystalVal
  }
}

// src/server/util/getGroupOrPeriod.mjs
function getGroupOrPeriod_default(data, key) {
  const periodOrGroupValue = getValue_default(data, key === "Group" ? "Group" : "Period")
  try {
    const num = periodOrGroupValue.match(/[0-9]+/)[0]
    return Number(num)
  } catch (error) {}
}

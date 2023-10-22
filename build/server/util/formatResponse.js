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

// src/server/util/formatResponse.mjs
var formatResponse_exports = {}
__export(formatResponse_exports, {
  default: () => formatResponse_default,
})
module.exports = __toCommonJS(formatResponse_exports)

// src/server/util/getAllotropes.mjs
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

// src/server/util/getImageData.mjs
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

// src/server/util/formatResponse.mjs
function formatResponse_default(data, name, description) {
  return {
    name,
    description,
    allotropes: getAllotropes_default(data, name),
    appearance: getValue_default(data, "Appearance"),
    abundance_earth: getValue_default(data, "in the Earth's crust"),
    standard_atw: getValue_default(data, { type: "list" }),
    atomic_number: getValue_default(data, "Atomic number (Z)"),
    group: getGroupOrPeriod_default(data, "Group"),
    period: getGroupOrPeriod_default(data, "Period"),
    block: getValue_default(data, "Block"),
    phase_stp: getValue_default(data, "Phase at STP"),
    melt_point: getValue_default(data, "Melting point"),
    sublim_point: getValue_default(data, "Sublimation point"),
    boil_point: getValue_default(data, "Boiling point"),
    density_stp: getValue_default(data, "Density (at STP)"),
    density_bp: getValue_default(data, "when liquid (at b.p.)"),
    density_near_rt: getValue_default(data, "Density (near r.t.)"),
    triple_point: getValue_default(data, "Triple point"),
    critical_point: getValue_default(data, "Critical point"),
    heat_fusion: getValue_default(data, "Heat of fusion"),
    heat_vaporisation: getValue_default(data, "Heat of vaporization"),
    molar_heat_capacity: getValue_default(data, "Molar heat capacity"),
    oxidation_states: getValue_default(data, "Oxidation states").split(","),
    electronegativity: getValue_default(data, "Electronegativity"),
    ionization_energies: getValue_default(data, "Ionization energies"),
    covalent_radius: getValue_default(data, "Covalent radius"),
    van_der_waals_radius: getValue_default(data, "Van der Waals radius"),
    occurance: getValue_default(data, "Natural occurrence"),
    speed_sound: getValue_default(data, "Speed of sound"),
    thermal_conductivity: getValue_default(data, "Thermal conductivity"),
    thermal_expansion: getValue_default(data, "Thermal expansion"),
    electrical_resistivity: getValue_default(data, "Electrical resistivity"),
    magnetic_ordering: getValue_default(data, "Magnetic ordering"),
    molar_magnetic_susceptibility: getValue_default(data, "Molar magnetic susceptibility"),
    cas_number: getValue_default(data, "CAS Number"),
    discovered_by: getValue_default(data, "Discovery"),
    named_by: getValue_default(data, "Named by"),
    naming: getValue_default(data, "Naming"),
    first_isolation: getValue_default(data, "First isolation"),
    image: getImageData_default(data, { type: "image" }),
    spectral_line: getImageData_default(data, { value: `Spectral lines of ${name.toLowerCase()}` }),
    crystal_structure: {
      value: getValue_default(data, "Crystal structure"),
      image: getImageData_default(data, { name: "Crystal structure" }),
    },
  }
}

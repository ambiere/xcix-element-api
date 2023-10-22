const pagination = require("../../../build/server/util/paginate.js").default
const getValue = require("../../../build/server/util/getValue.js").default
const formatResponse = require("../../../build/server/util/formatResponse.js").default
const getImageData = require("../../../build/server/util/getImageData.js").default
const data = require("../../../src/server/data/wikimedia/exampleResponse.json")
const elements = require("../../../src/server/data/db/db.json")

describe("Utils", () => {
  describe("Array.prototype.paginate", () => {
    let _page = 1
    const _limit = 4

    beforeEach(done => {
      pagination()
      done()
    })

    test("should return data of four elements: hydrogen to Beryllium", () => {
      expect(elements.elements.paginate(_page, _limit)).toEqual(elements.elements.slice(--_page, _limit))
    })
    test("should return error: _page number out of data length", () => {
      expect(elements.elements.paginate(_page + 12, _limit + 8)).toEqual({ error: "_page number out of data length" })
    })
    test("should return error: _page number can not be zero", () => {
      expect(elements.elements.paginate(--_page, _limit)).toEqual({ error: "_page number can not be zero" })
    })
  })

  describe("formatResponse Function", () => {
    const hydrogen = elements.elements[0]
    delete hydrogen.category
    delete hydrogen["cpk-hex"]
    delete hydrogen.electron_affinity
    delete hydrogen.electron_configuration
    delete hydrogen.electron_configuration_semantic
    delete hydrogen.shells
    delete hydrogen.symbol

    test("should return formated data", () => {
      expect(formatResponse(data.infobox, data.name, data.abstract)).toEqual(elements.elements[0])
    })
  })

  describe("getValue Function", () => {
    test("should return the appearance: colorless gas", () => {
      expect(getValue(data.infobox, "Appearance")).toEqual("Colorless gas")
    })

    test("should return standard_atw: [1.0080± 0.0002 (abridged)]", () => {
      expect(getValue(data.infobox, { type: "list" })).toEqual(["1.0080± 0.0002 (abridged)"])
    })

    test("should return ionization energies: [1st: 1312.0 kJ/mol]", () => {
      expect(getValue(data.infobox, "Ionization energies")).toEqual(["1st: 1312.0 kJ/mol"])
    })

    test("should return null", () => {
      expect(getValue(data.infobox, "Unknown property")).toEqual(null)
    })
  })

  describe("getImageData Function", () => {
    test("should return image data", () => {
      expect(getImageData(data.infobox, { type: "image" })).toEqual(elements.elements[0].image)
    })

    test("should return crystal structure image data", () => {
      expect(getImageData(data.infobox, { name: "Crystal structure" })).toEqual(
        elements.elements[0].crystal_structure.image,
      )
    })

    test("should return spectral lines image data", () => {
      expect(
        getImageData(data.infobox, { value: `Spectral lines of ${elements.elements[0].name.toLowerCase()}` }),
      ).toEqual(elements.elements[0].spectral_line)
    })
  })
})

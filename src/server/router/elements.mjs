import express from "express"
import morgan from "morgan"
const router = express.Router()
import lodash from "lodash"
import DB from "../data/db/db.json" assert { type: "json" }
import errorHandler from "../middleware/errorHandler.mjs"
import pagination from "../util/paginate.mjs"
import filtration from "../util/filter.mjs"
import deepProperties from "../util/deepProperties.mjs"

pagination()
filtration()

const elements = DB.elements
morgan.token("body", request => JSON.stringify(request.body))
router.use(express.json())
router.use(morgan("dev"))

router.get("/", async (req, res, next) => {
  try {
    const filterQ = Object.entries(req.query)
    if (filterQ.length > 0) {
      const _filterQ = filterQ.filter(q => q[0] != "_limit" && q[0] != "_page")
      const _page = filterQ.filter(q => q[0] === "_page").length && filterQ.filter(q => q[0] === "_page")[0][1]
      const _limit = filterQ.filter(q => q[0] === "_limit").length && filterQ.filter(q => q[0] === "_limit")[0][1]
      res.json(elements.filterElements(_filterQ).paginate(_page || 1, _limit))
    } else res.json(elements.paginate(req.query._page, req.query._limit))
  } catch (error) {
    next(error)
  }
})

router.get("/name/:name", async (req, resp, next) => {
  try {
    const name = req.params.name
    const deepProps = Object.entries(req.query)
    const match = elements.find(element => element.name.toLowerCase() === name.toLowerCase())
    if (match) {
      if (deepProps.length > 0) resp.json(deepProperties(match, deepProps))
      else resp.json(elements.filter(element => element.name.toLowerCase() === req.params.name.toLowerCase()))
    } else throw { name: "CastError", message: "Invalid element name" }
  } catch (error) {
    next(error)
  }
})

router.get("/atomic_number/:number", (req, res, next) => {
  try {
    res.json(elements.find(element => element.atomic_number === Number(req.params.number)))
  } catch (error) {
    next(error)
  }
})

router.get("/random", (req, res, next) => {
  try {
    res.json(elements[lodash.random(0, elements.length)])
  } catch (error) {
    next(error)
  }
})

router.use(errorHandler)

export default router

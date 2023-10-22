import axios from "axios"
import formatResponse from "../util/formatResponse.mjs"
import { config } from "dotenv"
import getValue from "../util/getValue.mjs"
config({ path: "~/xcix-periodic-table-api/.env" })

export default class ConfigAxios {
  static config() {
    axios.defaults.baseURL = process.env.WIKIMEDIA_API_CONTENT_URL
    axios.defaults.headers.get.Authorization = `Bearer ${process.env.WIKIMEDIA_API_ACCESS_TOKEN}`
    axios.defaults.transformResponse = new ConfigAxios().#transformResponse
  }

  #transformResponse(data) {
    const data_ = JSON.parse(data)
    const data__ = data_ && data_.find(_data_ => _data_.infobox !== undefined && _data_.in_language.identifier === "en")
    if (data__) {
      const infobox = data__.infobox[0].has_parts.map(part => part.has_parts).flat()
      const name = data__.name
      const abstract = data__.abstract
      return formatResponse(infobox, name, abstract)
    }
  }
}

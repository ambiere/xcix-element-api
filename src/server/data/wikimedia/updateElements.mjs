import axios from "axios"
import { config } from "dotenv"
import { green, red, yellow } from "kolorist"
import pkg from "../../../../package.json" assert { type: "json" }
import WikimediaAPI from "./wikimediaAPI.mjs"
import ConfigAxios from "../../config/axiosConfig.mjs"
import DB from "../db/util.mjs"
import names from "../db/names.mjs"
import Prompts from "../../../cli/promts.mjs"
import { cyan } from "kolorist"
config({ path: "~/xcix-periodic-table-api/.env" })

async function updateElements() {
  try {
    const resp = await WikimediaAPI.authenticate()
    const access_token = await resp.access_token
    process.env["WIKIMEDIA_API_ACCESS_TOKEN"] = access_token
  } catch (error) {}

  if (process.env.WIKIMEDIA_API_ACCESS_TOKEN) {
    console.log(green("[WikimediaAPI] Successfully Authenticated"))
    console.log()
    async function fetchUpdate(element) {
      const resp = await axios.get(element)
      const data = await resp.data
      if (data) return data
    }
    ConfigAxios.config()
    console.log(cyan(`[${pkg.version}] XCIX-ELEMENTS-API UPDATE`))
    console.log()
    const elementsToUpdate = await Prompts.whatToUpdate()
    console.log()
    console.log(yellow("[UpdateElements Function] Fetching Updated data..."))
    const elementsToUpdae_ = elementsToUpdate.elementsToUpdate ?? names
    elementsToUpdae_.map(name =>
      fetchUpdate(name)
        .then(data => DB.update(data))
        .catch(error => console.log(red(`[Axios: ${name}], ${error.message}`))),
    )
  } else {
    console.log(red("[WikimediaAPI] Authentication failed"))
  }
}

updateElements()

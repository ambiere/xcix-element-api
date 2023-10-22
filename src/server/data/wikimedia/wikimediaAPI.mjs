import axios from "axios"
import { bgMagenta, bold, yellow, black } from "kolorist"
import { config } from "dotenv"
import { cyan } from "kolorist"
import Prompts from "../../../cli/promts.mjs"
config({ path: "~/xcix-periodic-table-api/.env" })

export default class WikimediaAPI {
  static async authenticate() {
    console.log(cyan("WIKIMEDIA ENTERPRISE ACCOUNT AUTHENTICATION"))
    console.log()
    try {
      const credential = await Prompts.credential()
      console.log(yellow("\n[WikimediaAPI] Authenticating..."))
      const resp = await axios.post(process.env.WIKIMEDIA_API_LOGIN_URL, {
        username: credential.username,
        password: credential.password,
      })
      const data = await resp.data
      return data
    } catch (error) {
      console.log(red("\nWikimediaAPI: Authentication Error", error))
    }
  }
}

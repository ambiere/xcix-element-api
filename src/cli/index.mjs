import { gray, yellow, cyan } from "kolorist"
import { config } from "dotenv"
import pkg from "../../package.json" assert { type: "json" }
import app from "../server/server.mjs"

config({ path: "~xcix-periodic-table-api/.env" })

export default (async () => {
  try {
    console.log(yellow("[server] starting server..."))
    const port = process.env.PORT
    app.listen(port, () => {
      console.log("\u001b[32m[server]", "up and running\u001b[0m\n")
      console.log(gray(`XCIX-ElementsAPI version: ${pkg.version}\n`))
      console.log(cyan("\\(॰ ꤮ ॰)/ What's up there?"))
      console.log(gray("\nHome"))
      console.log(`http://localhost:${port}`)
      console.log(gray("\nResources"))
      console.log(`http://localhost:${port}/elements`)
      console.log(gray("..."))
      console.log()
    })
  } catch (error) {}
})()

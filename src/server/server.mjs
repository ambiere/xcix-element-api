import express from "express"
import { config } from "dotenv"
import compression from "compression"
import router from "./router/elements.mjs"
import { unknownEndpoint } from "./middleware/unknownEndpoint.mjs"
config({ path: "./.env" })

const app = express()
app.use(compression())
app.use(express.static("public"))
app.use("/elements", router)
app.use(unknownEndpoint)

export default app

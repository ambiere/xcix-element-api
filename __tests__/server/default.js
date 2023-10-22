const request = require("supertest")
const app = require("../../build/server/server.js").default
const elements = require("../../src/server/data/db/db.json")

describe("Server", () => {
  beforeEach(done => {
    server = app.listen(process.env.PORT, done)
  })
  afterEach(done => {
    server.close()
    done()
  })

  describe("GET /elements", () => {
    test("should respond with corresponding resources", () => {
      request(server).get("/elements").expect(200, elements.elements)
    })
  })

  describe("GET /elements/name/:name", () => {
    test("should respond with corresponding resource", () => {
      request(server).get("/elements/name/Hydrogen").expect(200, elements.elements[0])
    })
  })
})

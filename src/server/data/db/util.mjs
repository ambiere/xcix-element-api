import { writeFileSync, readFileSync } from "fs"
import lodash from "lodash"
import { red, green, yellow } from "kolorist"

export default class DB {
  constructor(path = process.cwd() + "/src/server/data/db/db.json") {
    this.dbPath = path
  }

  static get() {
    try {
      const path = new DB().dbPath
      const elementsJSON = readFileSync(path, "utf8")
      return JSON.parse(elementsJSON)
    } catch (error) {
      console.log(red(`[DB: ReadError] ${error}`))
    }
  }

  static add(element) {
    try {
      writeFileSync(new DB().dbPath, JSON.stringify(element, null, 2), "utf8")
    } catch (error) {
      console.log(red(`[DB: WriteError] ${error}`))
    }
  }

  static update(element) {
    try {
      const db = this.get()
      if (db.elements.length > 0) {
        const elementToUpdate = db.elements.find(el => el.atomic_number === element.atomic_number)
        if (elementToUpdate) {
          const key = Object.entries(element)
          const shouldUpdate = key.every(([x, xx]) => lodash.isEqual(elementToUpdate[x], xx))
          if (!shouldUpdate) {
            const filteredElements = db.elements.filter(el => el.atomic_number !== elementToUpdate.atomic_number)
            const updatedElement = { ...elementToUpdate, ...element }
            const updatedDB = filteredElements.concat(updatedElement)
            const sortedElements = updatedDB.sort((a, b) => Number(a.atomic_number) - Number(b.atomic_number))
            this.add({ elements: sortedElements })
            console.log(green(`[DB: ${element.name}] Successfully Updated`))
          } else {
            console.log(green(`[DB: ${element.name}] Up to date`))
          }
        } else {
          console.log(red(`[DB: ${element.name}] Not found in DB`))
          console.log(yellow(`[DB: ${element.name}] Adding element in DB...`))
          const updatedDB = db.elements.concat(element)
          const sortedElements = updatedDB.sort((a, b) => Number(a.atomic_number) - Number(b.atomic_number))
          this.add({ elements: sortedElements })
          console.log(green(`[DB: ${element.name}] Successfully Added`))
        }
      } else {
        console.log(red(`[DB: ${element.name}] Not found in DB`))
        console.log(yellow(`[DB: ${element.name}] Adding element in DB...`))
        const updatedDB = db.elements.concat(element)
        this.add({ elements: updatedDB })
        console.log(green(`[DB: ${element.name}] Successfully Added`))
      }
    } catch (error) {
      console.log(red(`[DB: UpdateError] ${error}`))
    }
  }
}

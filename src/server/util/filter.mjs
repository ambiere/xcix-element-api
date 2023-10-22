import { red } from "kolorist"

export default function () {
  /**
   * Filter elements of the periodic table,
   * and returns the elements that satisify all
   * the request query provided.
   *
   * @param {Object} query
   * @returns {any[]}
   */
  Array.prototype.filterElements = function (query) {
    let thisArray = this
    let elements = null
    let matchedElements = new Set()
    let iteration = 0
    try {
      while (iteration < query.length) {
        const _query = query[iteration]
        const _queryRegex = new RegExp(_query[1], "i")
        if (_query[0] === "group" || _query[0] === "period") {
          !elements
            ? (elements = thisArray.filter(element => element[_query[0]] === Number(_query[1])))
            : (elements = elements.filter(element => element[_query[0]] === Number(_query[1])))
        } else {
          !elements
            ? (elements = thisArray.filter(element => String(element[_query[0]]).match(_queryRegex)))
            : (elements = elements.filter(element => String(element[_query[0]]).match(_queryRegex)))
        }
        iteration++
      }
      elements.map(element => matchedElements.add(JSON.stringify(element)))
      return [...matchedElements.values()].map(val => JSON.parse(val))
    } catch (error) {
      console.log(red(`[FilterElements Function] ${error}`))
    }
  }
}

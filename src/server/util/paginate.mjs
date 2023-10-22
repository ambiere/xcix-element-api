export default function () {
  return (Array.prototype.paginate = function (page = 1, limit = this.length) {
    const startPosition = Number(--page) * Number(limit) || 0
    const endPosition = startPosition + Number(limit) || limit

    if (++page > 0) {
      if (startPosition < this.length) {
        return this.slice(startPosition ?? 0, endPosition)
      }
      return { error: "_page number out of data length" }
    }
    return { error: "_page number can not be zero" }
  })
}

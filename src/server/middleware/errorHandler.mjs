export default function errorHandler(error, request, response, next) {
  if (error.name === "CastError") {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

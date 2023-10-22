export default function (data, elementName) {
  const data_ = data.find(d => d && d.name === "Allotropes")
  return data_
    ? {
        value: data_.value,
        links: data_.links && {
          ...data_.links.find(link => link.text === `Allotropes of ${elementName.toLowerCase()}`),
        },
      }
    : null
}

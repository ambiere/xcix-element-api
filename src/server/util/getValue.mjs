export default function (data, key) {
  const _data = data.filter(d => {
    if (d && typeof key === "string" && "name" in d) {
      return /Ioni(z|s)ation energies/i.test(key) ? /Ioni(z|s)ation energies/i.test(d.name) : d.name === key
    } else if (d && "type" in d && !/Ioni(z|s)ation energies/i.test(d.name) && d.type === key.type)
      return d.type === key.type
  })

  if (key != "Crystal structure")
    return _data[0] ? (key.type || /Ioni(z|s)ation energies/i.test(key) ? _data[0].values : _data[0].value) : null
  else {
    const crystalVal = []
    _data.map(d => {
      crystalVal.push(d.value)
    })
    return crystalVal
  }
}

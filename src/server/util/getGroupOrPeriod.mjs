import getValue from "./getValue.mjs"

export default function (data, key) {
  const periodOrGroupValue = getValue(data, key === "Group" ? "Group" : "Period")
  try {
    const num = periodOrGroupValue.match(/[0-9]+/)[0]
    return Number(num)
  } catch (error) {}
}

export default function (match, deepProps) {
  const _deepProps = deepProps[0][0].split(".")
  const levelOne = _deepProps[0]
  const levelTwo = _deepProps[1]
  const levelThree = deepProps.length > 2 && _deepProps[2]
  const levelFour = deepProps.length > 3 && _deepProps[3]

  return {
    [levelTwo]: levelThree
      ? levelFour
        ? match[levelOne][levelTwo][levelThree][levelFour]
        : match[levelOne][levelTwo][levelThree]
      : match[levelOne][levelTwo],
  }
}

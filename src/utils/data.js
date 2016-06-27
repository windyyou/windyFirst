export function dict(key, array, keyColumn, valColumn) {
  let returnVal = key;
  if (array.length > 0) {
    for (const obj of array) {
      if (obj[keyColumn] === key) {
        returnVal = obj[valColumn];
        break;
      }
    }
  }

  return returnVal;
}

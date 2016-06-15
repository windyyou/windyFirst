export function dict(key, array, keyColum, valColum) {
  let returnVal = key;
  if (array.length > 0) {
    for (const obj of array) {
      if (obj[keyColum] === key) {
        returnVal = obj[valColum];
        break;
      }
    }
  }

  return returnVal;
}

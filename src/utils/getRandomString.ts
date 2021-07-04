export function getRandomString(length: number, skipLst: string[]): string {
  let result = "";
  if (skipLst.length <= 0)
    return (result = Math.random()
      .toString(20)
      .toUpperCase()
      .substr(2, length));
  while (skipLst.includes(result)) {
    result = Math.random().toString(20).toUpperCase().substr(2, length);
  }
  return result;
}

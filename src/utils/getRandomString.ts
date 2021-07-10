export function getRandomString(length: number, skipLst?: string[]): string {
  let result = "";
  if (!skipLst) return Math.random().toString(20).substr(2, length);

  while (skipLst.includes(result)) {
    result = Math.random().toString(20).substr(2, length);
  }
  return result;
}

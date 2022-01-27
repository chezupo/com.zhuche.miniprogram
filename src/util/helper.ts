export const replaceStr = (str: string, start: number, length: number, character: string,): string => {
  const characters: string = Array.from( Array(length), () => character).join('')

  return str.substring(0, start) + characters + str.substring(start + length)
}

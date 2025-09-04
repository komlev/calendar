export const padString = (
  str: string,
  length: number,
  padChar: string = " "
): string => {
  return str.length >= length
    ? str
    : padString(`${padChar}${str}`, length, padChar);
};

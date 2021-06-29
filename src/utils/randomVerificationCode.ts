export const randomVerificationCode = (length): number => {
  /**
   * Return a code to verify user's account
   * The start number always greater than 0 Ex: 100000
   */
  const min = parseInt("1".padEnd(length, "0"));
  const max = parseInt("9".padEnd(length, "9"));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

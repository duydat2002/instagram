export function formatNumberToSuffix(number) {
  const suffixes = ["", "K", "M", "B", "T"];

  if (number < 10000) {
    return number.toString();
  }

  const exp = Math.floor(Math.log10(number) / 3);

  const formattedNumber = (number / Math.pow(1000, exp)).toFixed(1);

  return `${formattedNumber}${suffixes[exp]}`;
}

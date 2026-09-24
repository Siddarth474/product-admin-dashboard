export const USD_TO_INR_RATE = 95;

export function convertUsdToInr(
  usdPrice: number,
  rate: number = USD_TO_INR_RATE
): number {
  return usdPrice * rate;
}

export function formatPriceInINR(
  usdPrice: number,
  rate: number = USD_TO_INR_RATE
): string {
  const inrAmount = convertUsdToInr(usdPrice, rate);

  return `₹${inrAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export const formatInr = formatPriceInINR;

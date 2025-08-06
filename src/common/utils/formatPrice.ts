export const formatPrice = (value?: number): string => {
  if (typeof value !== "number") return "Rp. -";
  const rounded = Math.floor(value); // buang desimal
  return "Rp. " + rounded.toLocaleString("id-ID").replaceAll(".", ",");
};

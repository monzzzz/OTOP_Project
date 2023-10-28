export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
  }).format(number);
  return newNumber;
};

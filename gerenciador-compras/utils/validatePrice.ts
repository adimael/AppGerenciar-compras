export const validatePrice = (price: string): boolean => {
    const priceValue = parseFloat(price);
    return !isNaN(priceValue) && priceValue > 0;
  };
  
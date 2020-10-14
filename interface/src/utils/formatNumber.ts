const formatNumber = (num: number): string => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(num);
};

export default formatNumber;

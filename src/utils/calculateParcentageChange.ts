export const calculatePercentageChange = (currentValue: number, oldValue: number, isGoodIfIncreased: boolean) => {
  if (currentValue === oldValue) return { change: '0%', isPositive: true} 
  
  const change = ((currentValue - oldValue) / oldValue) * 100;
  const isPositive = isGoodIfIncreased ? change >= 0 : change >= 0;
  console.log(`change >> ${change}, isGoodIfIncreased >> ${isGoodIfIncreased}, isPositive >> ${isPositive}`);
  const newQuantText = `${isPositive ? '⬆' : '⬇'} ${Math.abs(change).toFixed(2)}%`
  
  return {change: newQuantText, isPositive};
}
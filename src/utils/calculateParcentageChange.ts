export const calculatePercentageChange = (currentValue: number, oldValue: number, isGoodIfIncreased: boolean) => {

  const percentageChange = ((currentValue - oldValue) / oldValue) * 100;
  const change = `${isGoodIfIncreased ? '⬆' : '⬇'} ${Math.abs(percentageChange).toFixed(2)}% Last month ${oldValue}`
  
  return change;
}
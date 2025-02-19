export type ExpenseMatrix = {
  [Id: string] : number,
}

export type UserMatrix = {
  'title': string,
  'amount': number,
  'lastMonth': number,
  'isGoodIfIncreased': boolean,
  'change': string,
  'isPositive'?: boolean
}
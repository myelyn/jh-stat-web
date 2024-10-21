export const formatnum = (num: number, digit=0, isPercent: boolean) => {
  let scale = isPercent ? 100 : 1
  let str = (num * scale).toFixed(digit).toString()
  str = str.replace(/(?<!\.\d+)(?=\B(\d{3})+\b)/g, ',') +( isPercent ? '%' : '')
  return str
}
export const toCurrency = (value: number): string => {
  if (isNaN(value)) {
    return ''
  }

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatter.format(value)
}

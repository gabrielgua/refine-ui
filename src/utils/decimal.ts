export const formatWeight = (weight: number) => {
  return Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  }).format(weight)
}

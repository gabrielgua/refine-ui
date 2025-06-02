type WeigthtSuffix = 'gram' | 'kilogram'
export const formatWeight = (weight: number, options?: { suffix?: WeigthtSuffix }) => {
  const style = options?.suffix ? 'unit' : 'decimal'

  return Intl.NumberFormat('pt-BR', {
    style: style,
    unit: options?.suffix,
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  }).format(weight)
}

export const formatWithLeadingZeros = (value: number, minLength?: number) => {
  const DEFAULT_CREDENTIAL_LENGTH = 5
  minLength = minLength ? minLength : DEFAULT_CREDENTIAL_LENGTH

  return String(value).padStart(minLength, '0')
}

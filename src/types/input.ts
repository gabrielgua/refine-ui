export type InputSize = 'normal' | 'large'

export type BaseInputProps = {
  id: string
  label?: string
  size?: InputSize
  iconStart?: string
  iconEnd?: string
  disabled?: boolean
}

export type DropdownSelectOption = {
  value: string | number
  label: string
}

export const INPUT_SIZES_STYLES = new Map<InputSize, string>([
  ['large', 'p-4'],
  ['normal', 'p-2.5 text-sm'],
])

export const ICON_START_STYLES = new Map<InputSize, string>([
  ['large', 'ms-4'],
  ['normal', 'ms-3'],
])

export const ICON_END_STYLES = new Map<InputSize, string>([
  ['large', 'me-4'],
  ['normal', 'me-3'],
])

export const DROPDOWN_SIZES_STYLES = new Map<InputSize, string>([
  ['large', 'p-4 me-4'],
  ['normal', 'p-2.5 me-2.5 text-sm'],
])

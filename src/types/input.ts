export type InputSize = 'normal' | 'large' | 'small'
export type InputVariant = 'primary' | 'secondary'

export type BaseInputProps = {
  id: string
  label?: string
  labelInline?: boolean
  size?: InputSize
  iconStart?: string
  iconEnd?: string
  disabled?: boolean
  variant?: InputVariant
}

export type DropdownSelectOption = {
  value: string | number
  label: string
}

export const INPUT_SIZES_STYLES = new Map<InputSize, string>([
  ['large', 'p-4'],
  ['normal', 'p-2.5 text-sm'],
  ['small', 'p-1.5 text-sm'],
])

export const INPUT_VARIANT_STYLES = new Map<InputVariant, string>([
  [
    'primary',
    'bg-zinc-100 dark:bg-zinc-900 hover:ring-sky-600 focus-within:ring-sky-600 dark:focus-within:ring-offset-zinc-800 ',
  ],
  [
    'secondary',
    'bg-transparent !border border-zinc-100 ring-transparent hover:border-zinc-200 focus-within:border-zinc-200 focus-within:ring-zinc-200  dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus-within:ring-zinc-700 dark:focus-within:border-zinc-700 dark:focus-within:ring-offset-zinc-900',
  ],
])

export const ICON_START_STYLES = new Map<InputSize, string>([
  ['large', 'ms-4'],
  ['normal', 'ms-3'],
  ['large', 'me-2'],
])

export const ICON_END_STYLES = new Map<InputSize, string>([
  ['large', 'me-4'],
  ['normal', 'me-3'],
  ['small', 'me-2'],
])

export const DROPDOWN_SIZES_STYLES = new Map<InputSize, string>([
  ['large', 'p-4 me-4'],
  ['normal', 'p-2.5 me-2.5 text-sm'],
  ['small', 'p-1.5 me-1.5 text-sm'],
])

import type { Atendimento } from './atendimento.type'

export type Schedule = {
  serving: boolean
  current?: Atendimento
  next: Atendimento
  previous: Atendimento
}

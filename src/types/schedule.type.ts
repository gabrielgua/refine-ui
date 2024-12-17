import type { AtendimentoShort } from './atendimento.short.type'
import type { Atendimento } from './atendimento.type'

export type Schedule = {
  serving: boolean
  current?: Atendimento
  next: AtendimentoShort
  previous: AtendimentoShort
}

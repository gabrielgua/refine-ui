export type AtendimentoType = 'WEIGHT' | 'UNIT'

export type Atendimento = {
  id: number
  name: string
  type: AtendimentoType
  timeStart: string
  timeEnd: string
}

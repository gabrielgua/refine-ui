export type AtendimentoType = 'PRICE_PER_KG' | 'PRICE_PER_UNIT'

export type Atendimento = {
  id: number
  name: string
  priceType: AtendimentoType
  timeStart: string
  timeEnd: string
}

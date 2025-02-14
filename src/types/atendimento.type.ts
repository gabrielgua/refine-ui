export type AtendimentoType = 'PRICE_PER_KG' | 'PRICE_PER_UNIT'

export type Atendimento = {
  id: number
  name: string
  code: AtendimentoCode
  priceType: AtendimentoType
  timeStart: string
  timeEnd: string
}

export enum AtendimentoCode {
  CAFE = 'CAFE_001',
  ALMOCO = 'ALMOCO_002',
  LANCHE = 'LANCHE_003',
  JANTAR = 'JANTAR_004',
}

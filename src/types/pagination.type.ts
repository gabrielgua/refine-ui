export type Pagination<T> = {
  content: T[]
  size: number
  pageNumber: number
  totalPages: number
  totalElements: number
  hasNext: boolean
  hasPrevious: boolean
}

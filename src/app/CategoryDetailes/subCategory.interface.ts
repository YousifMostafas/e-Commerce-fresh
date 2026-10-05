export interface SubCategoryResponse {
  results: number
  metadata: Metadata
  data: sub[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface sub {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}

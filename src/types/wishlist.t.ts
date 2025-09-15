export interface Wishlist {
  status: string
  count: number
  data: WishlistProduct[]
}

export interface WishlistProduct {
  sold?: number
  images?: string[]
  subcategory?: Subcategory[]
  ratingsQuantity?: number
  _id?: string
  slug?: string
  description?: string
  quantity?: number
  category?: Category
  brand?: Brand
  ratingsAverage?: number
  createdAt?: string
  updatedAt?: string
  __v?: number
  title: string
  price: number
  imageCover: string
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
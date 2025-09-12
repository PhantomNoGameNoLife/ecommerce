export interface Cart {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: ProductCart[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface ProductCart {
  count: number
  _id: string
  product: string
  price: number
}

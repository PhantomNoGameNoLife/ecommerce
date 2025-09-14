export interface Cart {
  loading: boolean;
  numOfCartItems: number;
  data: Data;
}

export interface Data {
  products: ProductCart[];
  totalCartPrice: number;
}

export interface ProductCart {
  id: string;
  count: number;
  title: string;
  price: number;
  image: string;
}

export interface CountProduct {
  id: string;
  count: number;
}
export interface Product {
  id: string;
  imageCover: string;
  title: string;
  price: number;
  ratingsAverage: number;
  category: Category;
}

export interface Category {
  name: string;
}

export interface User {
  data: UserData;
}

export interface UserData {
  role: string;
  active: boolean;
  wishlist: string[];
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  resetCodeVerified: boolean;
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

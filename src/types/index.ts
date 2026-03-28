export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  [key: string]: unknown;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductsState {
  productsList: Product[];
  loading: boolean;
}

export interface CartState {
  cartItems: CartItem[];
}

export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  name: string;
}

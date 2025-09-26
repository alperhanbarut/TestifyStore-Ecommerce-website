export interface UserType {
  id?: string;
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingType;
  count?: number;
}

interface RatingType {
  rate: number;
  count: number;
}

import { IRegisterForm } from "./client.types";

export interface IUser {
  id: number;
  email: string;
  username: string;
}
export interface IAuthResponse {
  access: string;
  refresh: string;
}
export interface IRegisterBody extends Omit<IRegisterForm, "ava"> {
  ava: File;
}
export interface ISimpleData {
  id: number;
  name: string;
}
export interface IPlace {
  id: number;
  name: string;
  avg_price: number;
  avg_rating: number;
  coordinates_x: number;
  corrdinates_y: number;
  description: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  images: { id: number; image: string }[];
  categories: ISimpleData[];
}
export interface IPlacesParams {
  rating: number;
  min_price: string;
  max_price: string;
  category: number[];
}

import { IRegisterForm } from "./client.types";

export interface IUser {
  id: number;
  email: string;
  username: string;
}
export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}
export interface IRegisterBody extends Omit<IRegisterForm, "ava"> {
  ava: File;
}
export type Category = string;  // Категории могут быть строками

export interface IPlace {
  id: number;
  name: string;
  price: number;
  rating: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
  category: string;
}
export interface IPlacesParams {
  rating?: number; 
  price?: number;  
  categories: (number | string)[]; 
}

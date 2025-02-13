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
  ID: number;
  Name: string;
  Price: number;
  Rating: number;
  Latitude: number;
  Longitude: number;
  ImageURL: string;
  Category: string;
}
export interface IPlacesParams {
  rating?: number; 
  price?: number;  
  categories: (number | string)[]; 
}

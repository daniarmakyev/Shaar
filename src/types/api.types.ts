import { IRegisterForm } from "./client.types";


export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ICar {
  carModel?: string;
  year?: string;
  license?: string;
  vin?: string;
}
export interface IUser extends ICar {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  payment: string;
  ava: FileList;
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

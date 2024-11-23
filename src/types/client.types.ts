export type LanguageType = "ru" | "en" | "kg";
export interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  ava: FileList;
}

export interface ILoginForm extends Omit<IRegisterForm, "email"> {}
export interface INotification {
  message: string;
  isOpen: boolean;
  isAutoClose: boolean;
  type: "success" | "error" | "loading";
}
export type RatingsType = "all" | 5.0 | 4.5 | 4.0 | 3.5 | 3.0;
export interface IBuildingsFilter {
  categories: (number | string)[];
  rating: RatingsType;
  price: [number, number];
  radius: [number, number];
}
export interface IBuilding {
  name: string;
  images: string[];
  descrtiption: string;
  coordinates: { x: number; y: number };
}
export interface ITour {
  id: number;
  name: string;
  description: string;
  contacts: { tel: string };
  schedule: [
    {
      time: { start: string; end: string };
      location: IBuilding;
    }
  ];
}

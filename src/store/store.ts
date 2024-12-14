import { atom } from "jotai";
import { IBuildingsFilter, INotification } from "../types/client.types";

export const notificationAtom = atom<INotification>({
  message: "",
  isOpen: false,
  isAutoClose: true,
  type: "loading",
});
export const isAuthAtom = atom(false);

export const buildingsFilterAtom = atom<IBuildingsFilter>({
  categories: [],
  rating: "all",
  price: 0, 
});


export const searchValueAtom = atom("");
export const tourOnMapAtom = atom(0);

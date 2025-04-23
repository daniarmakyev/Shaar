import { atom } from "jotai";
import { $apiPrivate, apiConfig } from "../constants/api";
import { IUser } from "../types/api.types";

export const userAtom = atom<IUser | null>(null);

class UserService {
  async getUser(set: (update: IUser) => void) {

    try {
      const { data } = await $apiPrivate(apiConfig.User);
      set(data);
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      throw error;
    }
  }

  async changeUser(userData: object, set: (update: IUser) => void) {
    try {
      const { data } = await $apiPrivate.patch(apiConfig.User, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set(data);
      return data;
    } catch (error) {
      console.error("Ошибка при изменении профиля:", error);
      throw error;
    }
  }
}

export default new UserService();

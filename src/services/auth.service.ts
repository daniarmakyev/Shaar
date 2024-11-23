import { $api, apiConfig } from "../constants/api";
import { IAuthResponse } from "../types/api.types";
import { ILoginForm } from "../types/client.types";

class AuthService {
  register(body: FormData) {
    return $api.post<IAuthResponse>(apiConfig.Register, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  login(body: ILoginForm) {
    return $api.post<IAuthResponse>(apiConfig.Login, body);
  }
  refresh(refresh: string) {
    return $api.post(apiConfig.Refresh, { refresh });
  }
}

export default new AuthService();

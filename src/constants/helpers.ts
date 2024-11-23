import Cookies from "js-cookie";

export async function urlToFile(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  return new File([blob], `${filename}.jpeg`, { type: "image/jpeg" });
}

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("shaar-access-token", accessToken);
  Cookies.set("shaar-refresh-token", refreshToken, { expires: 30 });
};
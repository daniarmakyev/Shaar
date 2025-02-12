import { Route, Routes } from "react-router-dom";
import { routes, routes2, routes3 } from "./constants/routes";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Notification from "./components/ui/notification/Notification";
import { useMutation } from "@tanstack/react-query";
import authService from "./services/auth.service";
import { isAuthAtom } from "./store/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./i18n";
import MapLayout from "./layouts/mapLayout/MapLayout";

function App() {
  const [_, setIsAuth] = useAtom(isAuthAtom);
  const [__, setIsLoading] = useState(true);

  const { mutate: refresh } = useMutation({
    mutationFn: authService.refresh,
    onSuccess: ({ data }) => {
      localStorage.setItem("shaar-access-token", data.access);
      setIsAuth(true);
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    const refreshToken = Cookies.get("shaar-refresh-token");

    if (refreshToken) {

    } else setIsLoading(false);
  }, []);

  return (
    <div className="overflow-hidden">
      <Notification />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
        <Route path="/" element={<MapLayout />}>
          {routes3.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
        {routes2.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
import { Route, Routes } from "react-router-dom";
import { routes, routes2, routes3 } from "./constants/routes";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Notification from "./components/ui/notification/Notification";
import "./i18n";
import MapLayout from "./layouts/mapLayout/MapLayout";

function App() {
  return (
    <div className="overflow-hidden">
      <Notification />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route) => (
            <Route key={route.path} {...route}/>
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

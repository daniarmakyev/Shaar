import FavouritesPage from "../pages/favouritesPage/FavouritesPage";
import LoginPage from "../pages/loginPage/LoginPage";
import MainPage from "../pages/mainPage/MainPage";
import MapPage from "../pages/mapPage/MapPage";
import ParkingPage from "../pages/parkingPage/ParkingPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import WelcomePage from "../pages/welcomePage/WelcomePage";
import favouritesIcon from "../assets/images/icons/favourites.svg";
import profileIcon from "../assets/images/icons/profile2.svg";
import BuildingsPage from "../pages/buildingsPage/BuildingsPage";
import CalendarPage from "../pages/calendarPage/CalendarPage";
import ToursPage from "../pages/toursPage/ToursPage";
import TourPage from "../pages/tourPage/TourPage";

export const routes = [
  { path: "/", element: <MainPage />, label: "home" },
  { path: "/buildings", element: <BuildingsPage /> },
  {
    path: "/favourites",
    element: <FavouritesPage />,
    label: "bookmark",
    icon: favouritesIcon,
  },
  {
    label: "profile",
    icon: profileIcon,
    
  },
];

export const routes2 = [
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
];

export const routes3 = [
  { path: "/tours", element: <ToursPage />, label: "tours" },
  { path: "/tours/:id", element: <TourPage /> },
  {
    path: "/map/:latitude?/:longitude?/:tourId?",
    element: <MapPage />,
    label: "map",
  },
  { path: "/parking", element: <ParkingPage />, label: "parking" },
  { path: "/calendar", element: <CalendarPage /> },
  { path: "/profile", element: <ProfilePage /> },
];

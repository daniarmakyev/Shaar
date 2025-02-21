import { FC } from "react";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

const MapLayout: FC = () => {
  return (
    <>
      <Header />
      <main className="relative min-h-[calc(100vh-80px)] bg-gray-bg">

        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MapLayout;

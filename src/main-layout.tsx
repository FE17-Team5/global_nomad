import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";

const MainLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className={`flex flex-col min-h-screen ${isMainPage ? "bg-main-gradient" : ""}`}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

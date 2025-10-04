import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";

const MainLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className={isMainPage ? "min-h-screen bg-main-gradient" : ""}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

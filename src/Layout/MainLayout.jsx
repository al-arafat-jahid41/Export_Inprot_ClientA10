import Navbar from "../Components/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="pt-4 flex-1">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

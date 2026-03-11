import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        {/* Outlet is where the specific page (Home, Login, etc.) will render */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

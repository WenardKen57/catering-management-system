import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/public/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES - All wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* CUSTOMER ROUTES - Protected */}
        <Route element={<ProtectedRoute role="customer" />}>
          <Route element={<MainLayout />}></Route>
        </Route>

        {/* ADMIN ROUTES - Might need a different Layout! */}
        <Route element={<ProtectedRoute role="admin" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

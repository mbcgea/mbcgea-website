
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

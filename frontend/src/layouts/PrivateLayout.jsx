import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PrivateLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <Navbar />

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
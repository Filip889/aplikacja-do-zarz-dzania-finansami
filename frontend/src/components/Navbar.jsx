import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
        : "text-slate-600 hover:bg-white hover:shadow-md hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-4 z-50 px-4">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl px-6 py-3 flex justify-between items-center">
        
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
             <span className="text-white text-xl">💸</span>
          </div>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            FinancePro
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className={linkStyle("/dashboard")}>Panel</Link>
          <Link to="/transactions" className={linkStyle("/transactions")}>Transakcje</Link>
          <Link to="/categories" className={linkStyle("/categories")}>Kategorie</Link>
          <Link to="/history" className={linkStyle("/history")}>Historia</Link>
          <Link to="/settings" className={linkStyle("/settings")}>Ustawienia</Link>
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}export default Navbar;
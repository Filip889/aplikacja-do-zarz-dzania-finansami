import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      setError("Błędny email lub hasło");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
    <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100/50 w-full max-w-md border border-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Witaj ponownie</h1>
        <p className="text-slate-500 mt-2">Zaloguj się do swojego panelu finansowego</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="twoj@email.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Hasło</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
          Zaloguj się
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-600">
          Nie masz konta? <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700">Utwórz je za darmo</Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login;

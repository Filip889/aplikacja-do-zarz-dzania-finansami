import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Hasła muszą być takie same");
      return;
    }

    try {
      await api.post("/auth/register", {
        email,
        password
      });

      navigate("/login");
    } catch {
      setError("Nie udało się zarejestrować");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          REJESTRACJA
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Hasło"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Powtórz hasło"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Zarejestruj się
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Masz już konto?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Zaloguj się
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;

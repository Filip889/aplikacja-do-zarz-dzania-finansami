import { useState } from "react";
import axios from "../../api/axios";

export default function DangerZone() {
  const [password, setPassword] = useState("");

  const remove = async () => {
    if (!confirm("Czy na pewno usunąć konto?")) return;

    await axios.delete("/user", {
      data: { password },
    });

    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
      <h2 className="text-xl font-bold text-red-700 mb-4">Usunięcie konta</h2>

      <input
        type="password"
        className="w-full border rounded-xl p-3 mb-4"
        placeholder="Potwierdź hasłem"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={remove}
        className="bg-red-600 text-white px-6 py-3 rounded-xl"
      >
        Usuń konto
      </button>
    </div>
  );
}

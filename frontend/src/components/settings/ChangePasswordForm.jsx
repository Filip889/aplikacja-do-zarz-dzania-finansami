import { useState } from "react";
import axios from "../../api/axios";

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.put("/user/password", {
      currentPassword: current,
      newPassword: next,
    });

    setMsg("Hasło zmienione");
    setCurrent("");
    setNext("");
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow">
      <h2 className="text-xl font-bold mb-4">Zmiana hasła</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="password"
          className="w-full border rounded-xl p-3"
          placeholder="Aktualne hasło"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-xl p-3"
          placeholder="Nowe hasło"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Zmień hasło
        </button>

        {msg && <p className="text-green-600">{msg}</p>}
      </form>
    </div>
  );
}

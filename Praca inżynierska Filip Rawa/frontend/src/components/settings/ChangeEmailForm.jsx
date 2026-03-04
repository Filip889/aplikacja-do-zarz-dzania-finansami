import { useState } from "react";
import axios from "../../api/axios";

export default function ChangeEmailForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.put("/user/email", { email, password });
    setMsg("Email zmieniony");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow">
      <h2 className="text-xl font-bold mb-4">Zmiana emaila</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border rounded-xl p-3"
          placeholder="Nowy email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-xl p-3"
          placeholder="Potwierdź hasłem"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Zmień email
        </button>

        {msg && <p className="text-green-600">{msg}</p>}
      </form>
    </div>
  );
}

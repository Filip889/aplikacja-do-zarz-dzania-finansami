import { useEffect, useState } from "react";
import api from "../api/axios";

function AddTransaction({ onAdded }) {
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("expense");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get("/categories").then(res => {
      setCategories(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/transactions", {
      amount,
      description,
      date,
      type,
      category_id: categoryId
    });

    setAmount("");
    setDescription("");
    setDate("");
    setCategoryId("");

    onAdded();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4">
        Dodaj transakcję
      </h2>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <input
          type="number"
          placeholder="Kwota"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Opis"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <select
          value={type}
          onChange={e => {
            setType(e.target.value);
            setCategoryId("");
          }}
          className="border p-2 rounded"
        >
          <option value="expense">Wydatek</option>
          <option value="income">Przychód</option>
        </select>

        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
          className="border p-2 rounded"
        >
          <option value="">Wybierz kategorię</option>

          {categories
            .filter(c => c.type === type)
            .map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>

        <button className="bg-blue-600 text-white rounded px-4">
          Dodaj
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;

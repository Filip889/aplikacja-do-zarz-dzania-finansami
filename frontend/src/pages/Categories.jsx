import { useEffect, useState } from "react";
import api from "../api/axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await api.put(`/categories/${editingId}`, { name, type });
        setCategories(categories.map(c => c.id === editingId ? res.data : c));
        setEditingId(null);
      } else {
        const res = await api.post("/categories", { name, type });
        setCategories([...categories, res.data]);
      }
      
      setName("");
      setType("expense");
    } catch (err) {
      console.error("Błąd podczas zapisywania kategorii:", err);
      alert("Wystąpił błąd podczas zapisywania danych.");
    }
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setType(category.type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę kategorię?")) {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter(c => c.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setName("");
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Kategorie
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md p-8 flex gap-4 mb-10 transition-all border-2 border-transparent"
        style={editingId ? { borderColor: '#3b82f6' } : {}}
      >
        <input
          className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Nazwa kategorii"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <select
          className="border rounded-xl px-4 py-3"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="expense">Wydatek</option>
          <option value="income">Przychód</option>
        </select>

        <button 
          type="submit"
          className={`px-6 rounded-xl text-white transition-colors ${
            editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editingId ? 'Zapisz zmiany' : 'Dodaj'}
        </button>

        {editingId && (
          <button 
            type="button" 
            onClick={() => { setEditingId(null); setName(""); setType("expense"); }}
            className="text-slate-400 hover:text-slate-600 px-2"
          >
            Anuluj
          </button>
        )}
      </form>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="text-left px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Nazwa</th>
              <th className="text-left px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Typ</th>
              <th className="text-right px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-8 py-5 font-semibold text-slate-700">{c.name}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    c.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {c.type === 'income' ? 'Przychód' : 'Wydatek'}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => startEdit(c)} 
                      className="px-3 py-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-sm font-medium"
                    >
                      Edytuj
                    </button>
                    <button 
                      onClick={() => remove(c.id)} 
                      className="px-3 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all text-sm font-medium"
                    >
                      Usuń
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Categories;
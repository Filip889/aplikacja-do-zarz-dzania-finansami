import { useEffect, useState } from "react";
import api from "../api/axios";

function History() {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  
  const [type, setType] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [useMonthView, setUseMonthView] = useState(true);

  const fetchHistory = async (pageNumber = 1) => {
    try {
      const query = new URLSearchParams({
        page: pageNumber,
        limit: 10,
        type: type,
      });

      if (useMonthView) {
        query.append("month", month);
      } else {
        if (startDate) query.append("startDate", startDate);
        if (endDate) query.append("endDate", endDate);
      }

      const res = await api.get(`/transactions?${query.toString()}`);
      setTransactions(res.data.data);
      setPagination(res.data.pagination);
      setCurrentPage(pageNumber);
    } catch (err) {
      console.error("Błąd:", err);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, [type, month, startDate, endDate, useMonthView]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Historia transakcji</h1>
          <p className="text-gray-500">Zarządzaj swoimi finansami</p>
        </div>
        
        <button 
          onClick={() => setUseMonthView(!useMonthView)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {useMonthView ? "Przełącz na zakres dat" : "Przełącz na widok miesięczny"}
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">Typ</span>
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded-lg outline-none focus:ring-2 ring-blue-500">
              <option value="">Wszystkie</option>
              <option value="income">Przychody</option>
              <option value="expense">Wydatki</option>
            </select>
          </div>

          {useMonthView ? (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase">Wybierz miesiąc</span>
              <input 
                type="month" 
                value={month} 
                onChange={(e) => setMonth(e.target.value)} 
                className="border p-2 rounded-lg outline-none"
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">Od</span>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded-lg" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">Do</span>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded-lg" />
              </div>
            </>
          )}

          <button 
            onClick={() => { setType(""); setStartDate(""); setEndDate(""); }}
            className="ml-auto bg-gray-50 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-500 text-sm uppercase">
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Opis</th>
              <th className="px-6 py-4">Kategoria</th>
              <th className="px-6 py-4 text-right">Kwota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-medium">{t.description}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                    {t.category_name || "Brak"}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount} zł
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(pagination.pages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => fetchHistory(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold border transition-all ${
                currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:border-blue-400'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
import { useEffect, useState } from "react";
import api from "../api/axios";
import AddTransaction from "./AddTransaction";
import IncomeExpenseBars from "../components/IncomeExpenseBars";
import ExpenseByCategoryPie from "../components/ExpenseByCategoryPie";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0, byCategory: [] });
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  
  const [loading, setLoading] = useState(true);

  const reload = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/transactions?page=${pageNumber}&limit=5&month=${selectedMonth}`);
      setTransactions(res.data.data);
      
      const statsRes = await api.get(`/transactions/stats?month=${selectedMonth}`);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, [selectedMonth]);

  return (
<div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Panel finansowy</h1>
        
        <div className="mt-4 md:mt-0 flex items-center bg-white p-2 rounded-2xl shadow-sm border">
          <label className="mr-3 text-gray-500 font-medium">Okres:</label>
          <input 
            type="month" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="outline-none font-bold text-blue-600 cursor-pointer"
          />
        </div>
      </div>

      <AddTransaction onAdded={() => reload(1)} />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <div className="bg-white rounded-3xl shadow-md p-8">
          <p className="text-gray-500">Przychody</p>
          <p className="text-3xl font-bold mt-2 text-green-600">{stats.income} zł</p>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-8">
          <p className="text-gray-500">Wydatki</p>
          <p className="text-3xl font-bold mt-2 text-red-500">{stats.expense} zł</p>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-8">
          <p className="text-gray-500">Saldo</p>
          <p className={`text-3xl font-bold mt-2 ${stats.balance >= 0 ? "text-green-600" : "text-red-500"}`}>
            {stats.balance} zł
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="font-semibold text-lg mb-6">Przychody vs Wydatki</h2>
          <IncomeExpenseBars income={stats.income} expense={stats.expense} />
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="font-semibold text-lg mb-6">Wydatki wg kategorii</h2>
          {stats.byCategory.length > 0 ? (
            <ExpenseByCategoryPie data={stats.byCategory} />
          ) : (
            <p className="text-gray-400 italic">Brak danych do wyświetlenia wykresu</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Transactions;
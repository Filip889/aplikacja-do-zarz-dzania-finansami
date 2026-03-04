import { useEffect, useState } from "react";
import api from "../api/axios";
import AddTransaction from "./AddTransaction";
import IncomeExpenseBars from "../components/IncomeExpenseBars";
import ExpenseByCategoryPie from "../components/ExpenseByCategoryPie";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    byCategory: []
  });
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const reload = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/transactions?page=${pageNumber}&limit=5`);
      setTransactions(res.data.data);
      setPagination(res.data.pagination);
      setPage(pageNumber);

      const statsRes = await api.get("/transactions/stats");
      setStats(statsRes.data);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  if (loading && transactions.length === 0) {
    return <div className="p-10 text-center">Ładowanie danych...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10">Panel finansowy</h1>

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
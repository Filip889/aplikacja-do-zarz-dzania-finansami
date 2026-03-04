import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Przegląd finansów i szybki dostęp do funkcji
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <Link
  to="/transactions"
  className="relative overflow-hidden group bg-white border border-slate-100 rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] hover:-translate-y-2"
>
  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors"></div>
  
  <div className="relative z-10">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
        💰
      </div>
      <h2 className="text-xl font-semibold mb-2">Transakcje</h2>
      <p className="text-slate-500 leading-relaxed font-medium">
        Zarządzaj portfelem i analizuj wydatki z precyzyjnymi wykresami.
      </p>
  </div>
</Link>

        <Link
          to="/categories"
          className="group bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition"
        >
          <div className="text-5xl mb-6 group-hover:scale-110 transition">
            🗂
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Kategorie
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Organizuj kategorie finansowe
          </p>
        </Link>

         <Link
          to="/history"
          className="group bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition"
        >
          <div className="text-5xl mb-6 group-hover:scale-110 transition">
            📜
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Historia
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Zobacz historię swoich operacji
          </p>
        </Link>

        

      </section>
    </>
  );
}

export default Dashboard;

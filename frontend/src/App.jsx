import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Transactions from "./pages/Transactions";
import PrivateLayout from "./layouts/PrivateLayout";
import History from "./pages/History";
import Settings from "./pages/Settings";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" /> : <Register />}
        />

        {token && (
          <Route
            path="/"
            element={<PrivateLayout />}
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="categories" element={<Categories />} />
            <Route path="/history" element={<History  />}/>
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}

        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/dashboard";
  };

  return (
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Wyloguj
    </button>
  );
}

export default LogoutButton;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">MessagingApp</h1>
      {user && (
        <button className="bg-red-500 px-3 py-1 rounded" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUser } from "../redux/authSlice";
import { BACKEND_URL } from "../config";

function getInitials(name = "") {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initials = getInitials(user?.fullName || user?.name || user?.email);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(clearUser());
      setOpen(false);
      navigate("/");
    }
  };

  return (
    <div className="relative">
      {/* Top-right pill (avatar + name) */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 pr-10 hover:border-slate-500 transition"
      >
        <div className="w-13 h-13 rounded-full bg-linear-to-br from-purple-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white">
          {initials}
        </div>
        <span className="hidden sm:inline text-sm font-medium  text-white">
          {user?.fullName || user?.name || "Profile"}
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-3 w-70 bg-black rounded-2xl shadow-xl border border-slate-700 z-50">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {user?.fullName || user?.name || "User"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Menu items */}
          <div className="px-4 py-2 space-y-1 text-sm text-slate-200">
            <button className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-800/80 text-left" onClick={() => navigate("/")}>
              <span>🏠</span>
              <span>Home</span>
            </button>
            <button className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-800/80 text-left"onClick={() => navigate("/generate")}>
              <span>🎨</span>
              <span>Generate</span>
            </button>
            <button className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-800/80 text-left" onClick={() => navigate("/gallery")}>
              <span>🖼</span>
              <span>My Images</span>
            </button>
            <button className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-800/80 text-left">
              <span>📑</span>
              <span>Favorites</span>
            </button>
            <button className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-800/80 text-left">
              <span>⚙️</span>
              <span>Account Settings</span>
            </button>

          </div>

          {/* Logout */}
          <div className="px-4 py-3 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm font-semibold text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

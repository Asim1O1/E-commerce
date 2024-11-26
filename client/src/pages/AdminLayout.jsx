import {
  LayoutGrid,
  Package,
  Settings,
  ShoppingCart,
  LogOut,
} from "lucide-react"; // Add LogOut icon
import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
const sidebarItems = [
  {
    icon: <LayoutGrid size={20} />,
    label: "Dashboard",
    key: "dashboard",
    link: "/admin",
  },
  {
    icon: <Package size={20} />,
    label: "Products",
    key: "products",
    link: "/admin/products",
  },
  {
    icon: <ShoppingCart size={20} />,
    label: "Orders",
    key: "orders",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    key: "settings",
  },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = async () => {
    console.log("ENTERED THE LOGOUT FUNCTION");
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 sticky top-0 h-screen">
        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.link}
                  className={`block px-4 py-2 rounded ${
                    location.pathname === item.link
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center space-x-2"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

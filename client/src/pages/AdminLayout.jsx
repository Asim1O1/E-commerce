import { LayoutGrid, Package, Settings, ShoppingCart } from "lucide-react";
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
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
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

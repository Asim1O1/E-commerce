// App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import AddProducts from "./components/admin/AddProducts";
import AdminDashboard from "./components/admin/AdminDash";
import PageNotFound from "./pages/404 Page";
import AdminProducts from "./components/admin/AdminProducts";
import AdminLayout from "./pages/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/productDetail" element={<ProductDetailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          {/* <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<SettingsPage />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

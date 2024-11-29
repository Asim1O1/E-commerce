import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import UserLayout from "./pages/UserLayout";
import { checkAuth } from "./features/auth/authSlice.jsx";
import CheckAuth from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CategoriesPage from "./pages/Categories.jsx";
import ShopPage from "./pages/ShopPage.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="productDetail" element={<ProductDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="shopPage" element={<ShopPage />} />
          </Route>

          {/* Authentication Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route path="/addProduct" element={<AddProducts />} />

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

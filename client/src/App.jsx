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

import ShopPage from "./pages/ShopPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import UnauthPage from "./pages/UnAuthPage.jsx";
import OrderForm from "./components/OrderForm.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("The is authenticates state at  inital ", isAuthenticated, user);
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
          <Route
            path="/"
            element={
              <CheckAuth role="user">
                <UserLayout />
              </CheckAuth>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="productDetail/:id" element={<ProductDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="orderForm" element={<OrderForm />} />

            <Route path="shopPage" element={<ShopPage />} />
            <Route path="cartPage" element={<CartPage />} />
          </Route>

          {/* Authentication Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                user?.role === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                user?.role === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <RegisterPage />
              )
            }
          />

          {/* Admin Routes - Protected */}
          <Route
            path="/admin"
            element={
              <CheckAuth role="admin">
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route
            path="/addProduct"
            element={
              <CheckAuth role="admin">
                <AddProducts />
              </CheckAuth>
            }
          />

          {/* 404 Page */}
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

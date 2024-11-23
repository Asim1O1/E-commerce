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
import { checkAuth } from "./features/auth/authSlice";
import CheckAuth from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <HomePage />
              </CheckAuth>
            }
          />

          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />

          <Route path="/productDetail" element={<ProductDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
          <Route path="/addProduct" element={<AddProducts />} />
          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

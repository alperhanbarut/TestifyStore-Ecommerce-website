import HomePage from "../pages/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import "../css/RegisterPage.css";
import ProductDetails from "../pages/ProductDetails";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product-details/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
}

export default RouterConfig;

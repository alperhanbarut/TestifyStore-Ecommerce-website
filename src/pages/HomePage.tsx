import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ProductType, UserType } from "../types/Types";
import { setCurrentUser, setLoading, setProducts } from "../redux/AppSlice";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";
import { type RootState } from "../redux/store";
import Product from "../components/ProductCard";
import { useTheme, useMediaQuery } from "@mui/material";
import Slider from "../components/Slider";

function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.app);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response: ProductType[] = await ProductService.getAllProducts();
      if (response) {
        dispatch(setProducts(response));
      }
    } catch (error) {
      toast.error("Ürünler getirilirken bir hata meydana geldi: " + error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, []);

  const featuredProducts = products.slice(0, 10);

  return (
    <div style={{ width: "100%" }}>
      <div>
        <Slider />
      </div>

      <div style={{ margin: "5rem 2rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingBottom: "1rem",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {featuredProducts.map((product: ProductType, index: number) => (
            <div style={{ flex: "0 0 auto" }} key={index}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Product from "../components/ProductCard";
import CategoryMenu from "../components/CategoryMenu";
import type { ProductType } from "../types/Types";

function ProductsPage() {
  const { products } = useSelector((state: RootState) => state.app);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        p: 2,
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      {/* Sol: Kategori Menüsü */}
      <Box
        sx={{
          display: { xs: "block", md: "block" },
          width: { xs: "100%", md: 220 },
        }}
      >
        <CategoryMenu />
      </Box>

      {/* Sağ: Ürünler */}
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, md: "240px" },
          margin: "50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "340px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {products.map((product: ProductType) => (
            <Product key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductsPage;

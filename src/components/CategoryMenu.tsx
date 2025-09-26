import React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ProductService from "../services/ProductService";
import CategoryServices from "../services/CategoryServices";
import type { ProductType } from "../types/Types";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "../redux/AppSlice";
import { toast } from "react-toastify";

function CategoryMenu() {
  const dispatch = useDispatch();

  const categories = [
    "Elektronik",
    "Takı/Ziynet",
    "Erkek Giyim",
    "Kadın Giyim",
  ];

  const categoryMap: { [key: string]: string } = {
    Elektronik: "electronics",
    "Takı/Ziynet": "jewelery",
    "Erkek Giyim": "men's clothing",
    "Kadın Giyim": "women's clothing",
  };

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const handleCategory = async (
    e: React.ChangeEvent<HTMLInputElement>,
    cat: string
  ) => {
    try {
      dispatch(setLoading(true));

      let updatedCategories = [...selectedCategories];
      if (e.target.checked) updatedCategories.push(cat);
      else updatedCategories = updatedCategories.filter((c) => c !== cat);

      setSelectedCategories(updatedCategories);

      if (updatedCategories.length === 0) {
        const products: ProductType[] = await ProductService.getAllProducts();
        dispatch(setProducts(products));
        return;
      }

      const allProducts: ProductType[] = [];
      for (const c of updatedCategories) {
        const apiCategoryName = categoryMap[c];
        const products: ProductType[] =
          await CategoryServices.getProductByCategoryName(apiCategoryName);
        allProducts.push(...products);
      }

      dispatch(setProducts(allProducts));
    } catch (error) {
      console.error("Kategori API Hatası:", error);
      toast.error("Kategoriler alınırken bir hata oluştu");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        display: { xs: "block", md: "block" },
        width: { xs: "100%", md: 220 },
        border: "1px solid #e0e0e0",
        marginTop: "420px",
        marginLeft: "50px",
        borderRadius: 2,
        boxShadow: 2,
        p: 3,
        bgcolor: "background.paper",
        position: { xs: "relative", md: "fixed" },
        top: { md: 16 },
        left: { md: 16 },
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Kategoriler
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <FormGroup>
        {categories.map((cat, idx) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={(e) => handleCategory(e, cat)}
                sx={{ color: "primary.main" }}
              />
            }
            label={
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {cat}
              </Typography>
            }
            sx={{
              mb: 1,
              "&:hover": {
                bgcolor: "#f5f5f5",
                borderRadius: 1,
              },
              px: 1,
              borderRadius: 1,
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default CategoryMenu;

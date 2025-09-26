import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setCurrentUser, setProducts } from "../redux/AppSlice";
import { toast } from "react-toastify";
import ProductService from "../services/ProductService";
import type { ProductType } from "../types/Types";
import { productTitles } from "../Translations";
import Aurora from "@/components/Aurora";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);
  const { currentUser } = useSelector((state: RootState) => state.app);
  const [searchValue, setSearchValue] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser(null));
    navigate("/login");
    toast.success("Çıkış yapıldı");
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    if (window.location.pathname !== "/products") navigate("/products");
    try {
      const products: ProductType[] = await ProductService.getAllProducts();
      const filtered = products.filter((product) => {
        const displayTitle = productTitles[product.id] || product.title;
        return displayTitle.toLowerCase().includes(searchValue.toLowerCase());
      });
      dispatch(setProducts(filtered));
      setSearchValue("");
    } catch {
      toast.error("Filtreleme yaparken bir hata oluştu");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          px: 3,
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{ cursor: "pointer", fontWeight: "bold" }}
            >
              TestifyStore
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" onClick={() => navigate("/products")}>
                Ürünler
              </Button>
              <Button color="inherit" onClick={() => navigate("/about")}>
                Hakkımızda
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              placeholder="Ara..."
              variant="outlined"
              sx={{ width: 200 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon color="action" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              color="inherit"
              size="large"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={basket.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {!currentUser ? (
              <>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/login")}
                >
                  Giriş Yap
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Kayıt Ol
                </Button>
              </>
            ) : (
              <>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => navigate("/profile")}
                >
                  <AccountCircleIcon fontSize="medium" />
                </IconButton>
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Navbar ile çakışmayı önlemek için içerik üst boşluğu */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
      <Aurora />
    </>
  );
}

export default Navbar;

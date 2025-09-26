import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import type { ProductType } from "../types/Types";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";
import {
  incrementProductCount,
  decrementProductCount,
  removeProductFromBasket,
} from "../redux/BasketSlice";
import { useNavigate } from "react-router-dom";
import { productTitles } from "../Translations";
import { toast } from "react-toastify";

function CartPage() {
  const { basket } = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = basket.reduce(
    (acc, product) => acc + product.price * (product.count || 1),
    0
  );

  if (!basket.length) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <ShoppingCart sx={{ fontSize: 80, color: "#e0e0e0", mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#222" }}>
          Sepetiniz boş!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Henüz bir ürün eklemediniz. Alışverişe başlayın!
        </Typography>
        <button
          onClick={() => navigate("/products")}
          className="p-[3px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Alışverişe Devam Et
          </div>
        </button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        py: { xs: 14, md: 40 },
        maxWidth: 1000,
        minHeight: "100vh",
        mx: "auto",
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: "#222" }}>
        Sepetim
      </Typography>
      {basket.map((product: ProductType) => (
        <Card
          key={product.id}
          sx={{
            display: "flex",
            mb: 2,
            borderRadius: 3,
            boxShadow: 2,
            overflow: "hidden",
            transition: "box-shadow 0.2s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ width: 120, objectFit: "contain", bgcolor: "#fafafa", p: 2 }}
          />
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: "#222" }}
            >
              {productTitles[product.id] || product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* Kategori Türkçeleştirme */}
              {product.category === "men's clothing" && "Erkek Giyim"}
              {product.category === "women's clothing" && "Kadın Giyim"}
              {product.category === "electronics" && "Elektronik"}
              {product.category === "jewelery" && "Takı"}
              {![
                "men's clothing",
                "women's clothing",
                "electronics",
                "jewelery",
              ].includes(product.category) && product.category}
            </Typography>
            {/* Adet kontrolü */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <IconButton
                onClick={() => dispatch(decrementProductCount(product.id))}
                sx={{ bgcolor: "#f3f4f6", borderRadius: 2 }}
              >
                <Remove />
              </IconButton>
              <Typography
                sx={{
                  minWidth: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#222",
                }}
              >
                {product.count || 1}
              </Typography>
              <IconButton
                onClick={() => dispatch(incrementProductCount(product.id))}
                sx={{ bgcolor: "#f3f4f6", borderRadius: 2 }}
              >
                <Add />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => dispatch(removeProductFromBasket(product.id))}
                sx={{ ml: 1, bgcolor: "#fff0f0", borderRadius: 2 }}
              >
                <Delete />
              </IconButton>
            </Box>
            <Typography
              variant="body1"
              fontWeight="bold"
              color="primary"
              sx={{ mt: 1 }}
            >
              ${product.price} x {product.count || 1}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: "#6366f1" }}
            >
              Ara toplam: ${(product.price * (product.count || 1)).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          bgcolor: "#f3f4f6",
          p: 2,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#222" }}>
          Toplam: ${totalPrice.toFixed(2)}
        </Typography>
        <Button
          onClick={() => {
            toast.success("Siparişiniz başarıyla oluşturuldu!");
            dispatch({ type: "basket/clearBasket" });
            navigate("/");
          }}
          variant="contained"
          size="large"
          sx={{ borderRadius: 2, boxShadow: 2 }}
        >
          Satın Al
        </Button>
      </Box>
    </Box>
  );
}

export default CartPage;

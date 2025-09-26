import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/AppSlice";
import { toast } from "react-toastify";
import ProductService from "../services/ProductService";
import type { ProductType } from "../types/Types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import { addProductToBasket } from "../redux/BasketSlice";
import { productDescriptions, productTitles } from "../Translations";

interface CommentType {
  id: number;
  user: string;
  rating: number;
  text: string;
}

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [count, setCount] = useState<number>(1);

  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      user: "Ahmet",
      rating: 5,
      text: "Ürünü yaklaşık bir haftadır kullanıyorum ve gerçekten çok memnunum. Malzeme kalitesi harika, paketleme özenliydi. Kargo da hızlı geldi. Kesinlikle tavsiye ederim!",
    },
    {
      id: 2,
      user: "Ayşe",
      rating: 4,
      text: "Beklediğim gibi geldi, ürün açıklamasındaki tüm özellikler mevcut. Renkleri canlı ve kullanımı kolay. Sadece kargo biraz gecikti ama genel olarak memnun kaldım.",
    },
    {
      id: 3,
      user: "Mehmet",
      rating: 3,
      text: "Fiyatına göre iyi bir ürün. Çok yüksek beklentiniz olmasın ama işini gayet güzel yapıyor. Satıcı ilgiliydi, sorularıma hemen yanıt verdi.",
    },
    {
      id: 4,
      user: "Zeynep",
      rating: 5,
      text: "Ürün elime ulaştığında çok şaşırdım, beklediğimden daha kaliteli çıktı. Özellikle ergonomik tasarımı sayesinde uzun süre kullanabiliyorum. Teşekkürler!",
    },
    {
      id: 5,
      user: "Burak",
      rating: 4,
      text: "Satıcı çok ilgiliydi, ürünle ilgili aklıma takılan her şeyi hızlıca yanıtladı. Ürünün performansı gayet iyi, fiyat/performans açısından başarılı.",
    },
    {
      id: 6,
      user: "Elif",
      rating: 5,
      text: "Uzun araştırmalar sonucu bu ürünü aldım ve hiç pişman olmadım. Özellikle dayanıklılığı ve şık tasarımı çok hoşuma gitti. Herkese tavsiye ederim.",
    },
  ]);

  const categoryMap: { [key: string]: string } = {
    electronics: "Elektronik",
    jewelery: "Takı/Ziynet",
    "men's clothing": "Erkek Giyim",
    "women's clothing": "Kadın Giyim",
  };

  const getProductById = async (id: number) => {
    try {
      dispatch(setLoading(true));
      const response = await ProductService.getProductById(id);
      setProduct(response);
    } catch (error) {
      console.error(error);
      toast.error("Ürün getirilirken hata oluştu");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addToBasket = () => {
    if (product) {
      const payload: ProductType = {
        ...product,
        count: count,
      };
      dispatch(addProductToBasket(payload));
      toast.success("Ürün sepetinize eklendi");
    }
  };

  useEffect(() => {
    if (productId) getProductById(Number(productId));
  }, [productId]);

  if (!product)
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Ürün yükleniyor...
      </Typography>
    );

  const displayTitle = productTitles[product.id] || product.title;
  const fullDesc = productDescriptions[product.id] || product.description;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        p: { xs: 2, md: 6 },
        py: { xs: 10, md: 50 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Ürün Detay */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              flex: { xs: "unset", md: "0 0 400px" },
              width: { xs: "100%", md: 400 },
              height: 400,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              bgcolor: "#fafafa",
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={displayTitle}
              sx={{ width: "100%", height: "100%", objectFit: "contain", p: 2 }}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
          >
            <Typography variant="h4" fontWeight="bold">
              {displayTitle}
            </Typography>

            <Chip
              label={categoryMap[product.category] || product.category}
              color="primary"
              sx={{ width: "fit-content", fontWeight: "bold" }}
            />

            <Divider />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                value={product.rating?.rate || 0}
                precision={0.5}
                readOnly
              />
              <CommentIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                ({product.rating?.count || 0} yorum)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" fontWeight="bold">
              ${product.price}
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {fullDesc}
            </Typography>

            <TextField
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              type="number"
              label="Adet"
              defaultValue={1}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              sx={{ width: 100, mt: 2 }}
            />

            <Button
              onClick={addToBasket}
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{
                mt: 2,
                borderRadius: 2,
                py: 1.5,
                width: { xs: "100%", md: "auto" },
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              Sepete Ekle
            </Button>
          </Box>
        </Box>

        {/* Yorumlar */}
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Yorumlar
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {comments.map((c) => (
            <Box
              key={c.id}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 1,
                bgcolor: "#f9f9f9",
                transition: "0.3s",
                "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {c.user}
                </Typography>
                <Rating value={c.rating} readOnly size="small" />
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {c.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;

import React from "react";
import type { ProductType } from "../types/Types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { productDescriptions, productTitles } from "../Translations";

interface ProductProps {
  product: ProductType;
}

function ProductCard({ product }: ProductProps) {
  const navigate = useNavigate();
  const { id, title, price, category, image, rating } = product;

  const displayTitle = productTitles[id] || title;
  const fullDesc = productDescriptions[id] || product.description;
  const shortDesc =
    fullDesc.length > 100 ? fullDesc.substring(0, 100) + "..." : fullDesc;

  const categoryMap: { [key: string]: string } = {
    electronics: "Elektronik",
    jewelery: "Takı / Ziynet",
    "men's clothing": "Erkek Giyim",
    "women's clothing": "Kadın Giyim",
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        maxWidth: 360,
        minWidth: 220,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        border: "1px solid #e3e3e3",
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-6px) scale(1.03)",
          boxShadow: "0 16px 40px 0 rgba(31, 38, 135, 0.18)",
        },
      }}
      elevation={0}
      onClick={() => navigate("/product-details/" + id)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          alt={displayTitle}
          image={image}
          sx={{
            objectFit: "contain",
            width: "100%",
            minHeight: 140,
            maxHeight: 220,
            p: 2,
            background: "linear-gradient(90deg, #f1f5f9 60%, #e0e7ff 100%)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        {/* Category Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: "0.75rem",
            fontWeight: 500,
            background: "linear-gradient(90deg, #6366f1 60%, #818cf8 100%)",
            color: "#fff",
            boxShadow: 2,
            letterSpacing: 0.5,
          }}
        >
          {categoryMap[category] || category}
        </Box>
        {/* Price Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: "0.85rem",
            fontWeight: 700,
            background: "linear-gradient(90deg, #f59e42 60%, #fbbf24 100%)",
            color: "#fff",
            boxShadow: 2,
            letterSpacing: 0.5,
          }}
        >
          ${price}
        </Box>
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          pt: 2,
          pb: 1,
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3rem",
            fontWeight: 700,
            color: "#312e81",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {displayTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#64748b", mb: 1.5, fontSize: "0.98rem" }}
        >
          {shortDesc}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            name="read-only"
            value={rating?.rate || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ color: "#f59e42" }}
          />
          <Typography
            variant="body2"
            sx={{ ml: 1, color: "#6366f1", fontWeight: 500 }}
          >
            ({rating?.count || 0})
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", px: 2, pb: 2 }}>
        <Button
          variant="contained"
          size="medium"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            fontSize: "1rem",
            background: "linear-gradient(90deg, #6366f1 60%, #818cf8 100%)",
            color: "#fff",
            boxShadow: 2,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #818cf8 60%, #6366f1 100%)",
              boxShadow: 3,
            },
          }}
        >
          Detayları Gör
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;

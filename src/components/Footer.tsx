import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "var(--color-background, #f8fafc)",
        color: "var(--color-foreground, #222)",
        borderTop: "1px solid var(--color-border, #e5e7eb)",
        px: { xs: 2, md: 6 },
        py: { xs: 3, md: 2 },
        width: "100%",
        boxShadow: "0 -1px 8px rgba(0,0,0,0.04)",
        position: "relative",
        zIndex: 2,
        marginTop: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "var(--color-primary, #6366f1)",
            letterSpacing: 1,
            mb: { xs: 2, md: 0 },
          }}
        >
          TestifyStore
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: { xs: 2, md: 0 },
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {[
            { label: "Ana Sayfa", href: "/" },
            { label: "Ürünler", href: "/products" },
            { label: "Hakkımızda", href: "/about" },
            { label: "İletişim", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              underline="none"
              color="inherit"
              sx={{
                fontWeight: 500,
                px: 1.2,
                py: 0.5,
                borderRadius: 2,
                transition: "background 0.2s, color 0.2s",
                "&:hover": {
                  background: "transparent",
                  color: "var(--sm-accent, #5227FF)",
                  textDecoration: "none",
                },
              }}
            >
              {item.label}
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          {[
            {
              icon: <FacebookIcon fontSize="small" />,
              href: "https://facebook.com",
              label: "Facebook",
            },
            {
              icon: <InstagramIcon fontSize="small" />,
              href: "https://instagram.com",
              label: "Instagram",
            },
            {
              icon: <TwitterIcon fontSize="small" />,
              href: "https://twitter.com",
              label: "Twitter",
            },
          ].map((item) => (
            <IconButton
              key={item.label}
              color="inherit"
              href={item.href}
              target="_blank"
              sx={{
                background: "var(--color-primary, #6366f1)",
                color: "#fff",
                borderRadius: "50%",
                boxShadow: "0 1px 4px rgba(99,102,241,0.08)",
                transition: "background 0.2s, color 0.2s",
                "&:hover": {
                  background: "var(--color-secondary, #818cf8)",
                  color: "#fff",
                },
              }}
              aria-label={item.label}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "40px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderTop: "1px solid #e5e7eb",
            position: "absolute",
            left: 0,
            bottom: 8,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: "50%",
            bottom: -16,
            transform: "translateX(-50%)",
            color: "#6b7280",
            fontWeight: 400,
            letterSpacing: 0.5,
            fontSize: { xs: "0.75rem", md: "0.8rem" },
            background: "transparent",
            borderRadius: 0,
            py: 0,
            boxShadow: "none",
            textAlign: "center",
            pointerEvents: "auto",
          }}
        >
          © 2025 TestifyStore. Tüm hakları saklıdır.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;

import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/RegisterPage.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LockResetIcon from "@mui/icons-material/LockReset";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { RegisterPageSchema } from "../schemas/RegisterPageSchema";
import RegisterPageService from "../services/RegisterPageService";
import type { UserType } from "../types/Types";

function RegisterPage() {
  const navigate = useNavigate();

  const submit = async (values: any, action: any) => {
    try {
      const payload: UserType = {
        username: values.username,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
      };
      const response = await RegisterPageService.register(payload);
      if (response) {
        toast.success("Kullanıcı kaydı başarılı");
        clear();
        navigate("/login");
      }
    } catch (error) {
      toast.error("Kullanıcı kaydedilirken bir hata oluştu");
    }
  };

  const { values, handleChange, handleSubmit, resetForm, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        rePassword: "",
      },
      validationSchema: RegisterPageSchema,
      onSubmit: submit,
    });

  const clear = () => {
    resetForm();
  };

  useEffect(() => {
    Object.keys(errors).forEach((field) => {
      if (touched[field as keyof UserType] && errors[field as keyof UserType]) {
        toast.error(errors[field as keyof UserType]);
      }
    });
  }, [errors, touched]);

  return (
    <div className="register-page">
      <form className="register-form mt-40 mb-30" onSubmit={handleSubmit}>
        {/* Kullanıcı Adı */}
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="username"
            name="username"
            label="Kullanıcı Adı"
            variant="standard"
            fullWidth
            value={values.username}
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
        </Box>

        {/* Email */}
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <MailOutlineIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="email"
            name="email"
            label="E-Mail"
            variant="standard"
            fullWidth
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </Box>

        {/* Şifre */}
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <LockPersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Şifre"
            variant="standard"
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Box>

        {/* Şifre Tekrar */}
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <LockResetIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="rePassword"
            name="rePassword"
            type="password"
            label="Şifre Tekrar"
            variant="standard"
            fullWidth
            value={values.rePassword}
            onChange={handleChange}
            error={touched.rePassword && Boolean(errors.rePassword)}
            helperText={touched.rePassword && errors.rePassword}
          />
        </Box>

        {/* Aksiyonlar */}
        <div className="actions">
          <Button variant="contained" type="submit">
            Kaydol
          </Button>
          <p>
            Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;

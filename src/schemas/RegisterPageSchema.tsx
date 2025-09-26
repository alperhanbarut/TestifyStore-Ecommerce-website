import * as yup from "yup";

export const RegisterPageSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalı! ⚠️")
    .required("Kullanıcı adı zorunludur!"),
  email: yup
    .string()
    .email("Geçerli bir e-mail giriniz! 📧")
    .required("E-mail alanı zorunludur!"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalı! 🔑")
    .required("Şifre zorunludur!"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor! ❌")
    .required("Şifre tekrar alanı zorunludur!"),
});
